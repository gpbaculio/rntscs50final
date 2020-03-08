import React, {useState, useContext} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {TodosContext} from './';

const TodoInput = () => {
  const [newTodoText, setNewTodoText] = useState('initialState');
  const {renderTodos, loading} = useContext(TodosContext);
  const todos = renderTodos();
  return (
    <View style={styles.inputContainer}>
      <TouchableOpacity
        disabled={loading.toggleAll}
        onPress={toggleCompleteAll}>
        <Text
          style={[
            styles.completeAll,
            todos.every(({complete}) => complete) && styles.completeFilterColor,
          ]}>
          {String.fromCharCode(10003)}
        </Text>
      </TouchableOpacity>
      <TextInput
        editable={loading.addTodo}
        returnKeyType="done"
        blurOnSubmit={false}
        onSubmitEditing={this.addTodo}
        placeholder="What needs to be done?"
        style={styles.input}
        onChangeText={text => setNewTodoText(text)}
        value={newTodoText}
      />
    </View>
  );
};

export default TodoInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FEFEFE',
    borderBottomColor: '#F5F5F5',
    borderBottomWidth: 1,
  },
  completeAll: {
    fontSize: 30,
    color: '#CCC',
    marginLeft: 5,
  },
  input: {
    flex: 1,
    height: 50,
    marginLeft: 5,
    fontSize: 24,
  },
  completeFilterColor: {
    color: 'green',
  },
});
