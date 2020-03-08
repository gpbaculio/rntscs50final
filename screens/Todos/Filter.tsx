import React, {useContext} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {TodosContext} from '.';

const Filter = () => {
  const {renderTodos, filter} = useContext(TodosContext);
  const todos = renderTodos();
  const showClear = !!todos.length && todos.some(({complete}) => complete);
  return (
    <View style={styles.container}>
      <Text>{todos.length} count</Text>
      <View style={[styles.filters, !showClear && {alignItems: 'flex-start'}]}>
        <TouchableOpacity
          onPress={() => this.props.setFilter('All')}
          style={[styles.filter, filter === 'All' && styles.selected]}>
          <Text>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.setFilter('Active')}
          style={[styles.filter, filter === 'Active' && styles.selected]}>
          <Text>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.setFilter('Completed')}
          style={[styles.filter, filter === 'Completed' && styles.selected]}>
          <Text>Completed</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={!showClear && {opacity: 0}}
        disabled={!showClear}
        onPress={() => this.props.clearCompleted()}>
        <Text style={styles.clearColor}>Clear Completed</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
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
