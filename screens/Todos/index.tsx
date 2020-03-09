import React, {useState, createContext, useContext, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Text,
} from 'react-native';
import TodoInput from './TodoInput';
import {FlatList} from 'react-native-gesture-handler';

import {AuthContext} from '../../components/Root';
import Todo, {TodoType} from './Todo';
import Filter from './Filter';

type FilterType = 'All' | 'Active' | 'Completed';
type TodosMethodContext = {
  setCurrentFilter: (filterType: FilterType) => void;
  todos: TodoType[];
  currentFilter: FilterType;
  setTodos: (newTodos: TodoType[]) => void;
  count: number;
};

export const TodosContext = createContext<TodosMethodContext>({
  setCurrentFilter: function() {},
  todos: [],
  currentFilter: 'All',
  setTodos: function() {},
  count: 0,
});

export type LoaderPropsType = {
  type?: string;
};

export const Loader: React.FC<LoaderPropsType> = ({type}) => (
  <View style={[type !== 'fetching' && styles.loading]}>
    <ActivityIndicator animating size="large" />
  </View>
);

const Todos = () => {
  const {user} = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [currentFilter, setCurrentFilter] = useState<FilterType>('All');
  const [todosTotal, setTodosTotal] = useState(todos.length);
  const [lastPage, setlastPage] = useState(0);

  useEffect(() => {
    fetch(`https://5e65ab532aea440016afb25f.mockapi.io/users/${user!.id}/todos`)
      .then(response => response.json())
      .then(todosResult => {
        setTodosTotal(todosResult.length);
      });
  }, [user]);
  useEffect(() => {
    console.log('useEffect!', {
      lastPage,
      page,
    });
    console.log('lastPage~', todos.length);
    const perPage = 10;
    if (
      loading ||
      todosTotal === todos.length ||
      lastPage === page ||
      lastPage * perPage >= todosTotal
    ) {
      return;
    }
    if (user) {
      setLoading(true);
      setlastPage(page);
      fetch(
        `https://5e65ab532aea440016afb25f.mockapi.io/users/${
          user.id
        }/todos?sortBy=createdAt&order=desc&l=${perPage}&p=${page}`,
      )
        .then(response => response.json())
        .then(
          todosResult => {
            // we remove duplicate because the free api returns the recently added todo
            setTodos(
              [...todos, ...todosResult].filter(
                (todo, idx, todosArr) =>
                  todosArr.findIndex(t => t.id === todo.id) === idx,
              ),
            );
            setLoading(false);
          },
          fetchTodosError => {
            setError(fetchTodosError);
            setLoading(false);
          },
        );
    }
  }, [lastPage, loading, page, todos, todosTotal, user]);

  const renderTodos = () => {
    switch (currentFilter) {
      case 'Active':
        return todos.filter(({complete}) => !complete);
      case 'Completed':
        return todos.filter(({complete}) => complete);
      default:
        return todos;
    }
  };

  const renderSeparator = () => <View style={styles.separator} />;
  const renderFooter = () => (!loading ? null : <Loader type="fetching" />);

  const handleLoadMore = () => {
    setPage(page + 1);
  };
  const currentTodos = renderTodos();
  const count = currentTodos.length;
  const showClear = currentTodos.some(({complete}) => complete);
  return (
    <TodosContext.Provider
      value={{
        setCurrentFilter,
        todos,
        currentFilter,
        setTodos,
        count,
      }}>
      <View style={styles.container}>
        {!!error && <Text style={styles.errorMessage}>{error}</Text>}
        <TodoInput />
        <FlatList
          style={styles.todosContainer}
          data={currentTodos}
          renderItem={({item}) => <Todo {...item} />}
          keyExtractor={({id}) => id}
          ItemSeparatorComponent={renderSeparator}
          ListFooterComponent={renderFooter}
          onEndReachedThreshold={0.01}
          onEndReached={handleLoadMore}
        />
        <Filter showClear={showClear} />
      </View>
    </TodosContext.Provider>
  );
};

export default Todos;

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  errorMessage: {fontSize: 10, color: 'red'},
  loading: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, .2)',
  },
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    alignItems: 'center',
    padding: 20,
    width,
  },
  todosContainer: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
  },
  separator: {
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
});
