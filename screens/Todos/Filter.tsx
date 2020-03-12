import React, {useContext, useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {TodosContext, Loader} from './';
import {AuthContext} from '../../components/Root';

interface FilterPropsType {
  showClear: boolean;
}
const Filter: React.FC<FilterPropsType> = ({showClear}) => {
  const {user} = useContext(AuthContext);
  const {todos, currentFilter, setCurrentFilter, setTodos, count} = useContext(
    TodosContext,
  );
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const clearCompleted = async () => {
    setLoading(true);
    const completedTodos = todos.filter(({complete}) => complete);
    const activeTodos = todos.filter(({complete}) => !complete);
    try {
      for (const completedTodo of completedTodos) {
        await fetch(
          `https://5e65ab532aea440016afb25f.mockapi.io/users/${
            user!.id
          }/todos/${completedTodo.id}`,
          {
            method: 'DELETE',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          },
        );
      }
      setTodos(activeTodos);
      setLoading(false);
    } catch (clearCompletedError) {
      setError(clearCompletedError);
      setLoading(false);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text>{count} count</Text>
        <View style={[styles.filters, !showClear && styles.clearAlign]}>
          <TouchableOpacity
            onPress={() => {
              setCurrentFilter('All');
            }}
            style={[styles.filter, currentFilter === 'All' && styles.selected]}>
            <Text>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCurrentFilter('Active');
            }}
            style={[
              styles.filter,
              currentFilter === 'Active' && styles.selected,
            ]}>
            <Text>Active</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCurrentFilter('Completed');
            }}
            style={[
              styles.filter,
              currentFilter === 'Completed' && styles.selected,
            ]}>
            <Text>Completed</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={!showClear && styles.hide}
          disabled={!showClear}
          onPress={clearCompleted}>
          <Text style={styles.clearColor}>Clear Completed</Text>
        </TouchableOpacity>
      </View>
      {!!error && <Text style={styles.errorMessage}>{error}</Text>}
      {!!loading && <Loader />}
    </>
  );
};

export default Filter;

const styles = StyleSheet.create({
  errorMessage: {fontSize: 10, color: 'red'},
  hide: {opacity: 0},
  clearAlign: {alignItems: 'flex-start'},
  clearColor: {color: '#cc9a9a'},
  container: {
    paddingVertical: 16,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderTopColor: '#F5F5F5',
    borderTopWidth: 1,
    width: '100%',
  },
  filters: {
    flexDirection: 'row',
  },
  filter: {
    paddingHorizontal: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selected: {
    borderColor: 'rgba(175,47,47,.2)',
  },
});
