import React, {useState, useReducer, createContext, Dispatch} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import todosReducer, {todosInitState} from './reducer';
import TodoInput from './TodoInput';
import {FlatList} from 'react-native-gesture-handler';
import {TodosStateType} from './types';

// eslint-disable-next-line no-spaced-func
export const TodosContext = createContext<
  TodosStateType & {
    renderTodos: () => any[];
    dispatch: Dispatch<any> | null;
  }
>({
  ...todosInitState,
  renderTodos: () => [],
  dispatch: null,
});

const Loader = () => (
  <View style={styles.loading}>
    <ActivityIndicator animating size="large" />
  </View>
);

const Todos = () => {
  const [page, setPage] = useState(1);
  const [refetching, setRefetching] = useState(false);
  const [state, dispatch] = useReducer(todosReducer, todosInitState);

  const renderTodos = () => {
    const {todoIds, todos, filter} = state;
    const currentTodos = [...todoIds.map((id: string) => todos[id])];
    switch (filter) {
      case 'Active':
        return currentTodos.filter(({complete}) => !complete);
      case 'Completed':
        return currentTodos.filter(({complete}) => complete);
      default:
        return currentTodos;
    }
  };

  const renderSeparator = () => <View style={styles.separator} />;
  const renderFooter = () => (!refetching ? null : <Loader />);
  const renderLoader = () => {
    if (
      state.loading.fetchTodos ||
      state.loading.toggleAll ||
      state.loading.clearCompleted
    ) {
      return <Loader />;
    }
  };
  const handleLoadMore = async () => {
    if (!state.endReached) {
      setRefetching(true);
      setPage(page + 1);
      await this.props.fetchTodos(this.state.page);
      setRefetching(false);
    }
  };
  return (
    <TodosContext.Provider
      value={{...state, renderTodos, ...(dispatch && {dispatch})}}>
      <View style={styles.container}>
        <TodoInput />
        <FlatList
          style={styles.todosContainer}
          data={renderTodos()}
          renderItem={({item}) => <Todo {...item} />}
          keyExtractor={({id}) => id}
          ItemSeparatorComponent={renderSeparator}
          ListFooterComponent={renderFooter}
          onEndReachedThreshold={0.01}
          onEndReached={handleLoadMore}
        />
        <Filter />
        {renderLoader()}
      </View>
    </TodosContext.Provider>
  );
};

export default Todos;

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
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
