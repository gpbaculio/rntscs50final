import React, {useState} from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type TodoPropsType = {
  todoText: string;
};

const Todo: React.FC<TodoPropsType> = ({todoText}) => {
  const [text, setText] = useState(todoText);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleEditing = () => {
    setEditing(!editing);
    setLoading(false);
  };

  editTodo = async () => {
    this.setState({load: true});
    await this.props.editTodo({text: this.state.text, id: this.props.id});
    this.toggleEditing();
  };

  deleteTodo = () => {
    Alert.alert(
      `Delete ${this.props.text}?`,
      'Please Confirm to Proceed',
      [
        {
          text: 'Confirm',
          onPress: async () => {
            this.setState({load: true});
            await this.props.deleteTodo(this.props.id);
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };

  toggleTodo = async () => {
    const {id, complete} = this.props;
    this.setState({load: true});
    await this.props.toggleTodo({id, complete: !complete});
    this.setState({load: false});
  };

  const textComponent = (
    <TouchableOpacity style={styles.textWrap} onLongPress={toggleEditing}>
      <Text style={[styles.text, complete && styles.complete]}>{text}</Text>
    </TouchableOpacity>
  );
  const removeButton = (
    <TouchableOpacity onPress={this.deleteTodo}>
      <MaterialIcons name={'delete'} size={24} color={'#cc9a9a'} />
    </TouchableOpacity>
  );
  const doneButton = (
    <TouchableOpacity onPress={this.editTodo}>
      <MaterialIcons name={'save'} size={24} color={'green'} />
    </TouchableOpacity>
  );
  const editingComponent = (
    <View style={styles.textWrap}>
      <TextInput
        editable={!this.props.loading.editTodo}
        returnKeyType="done"
        blurOnSubmit={false}
        onSubmitEditing={this.editTodo}
        onChangeText={newText => setText(newText)}
        multiline
        autofocus
        value={this.state.text}
        style={styles.input}
      />
    </View>
  );
  return (
    <View style={styles.container}>
      <Switch onValueChange={this.toggleTodo} value={complete} />
      {editing ? editingComponent : textComponent}
      {editing ? doneButton : removeButton}
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator animating size="small" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    padding: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
  },
  complete: {
    textDecorationLine: 'line-through',
  },
  textWrap: {
    flex: 1,
    marginHorizontal: 5,
  },
  text: {
    fontSize: 16,
    color: '#4d4d4d',
  },
  input: {
    flex: 1,
    height: 24,
    fontSize: 20,
    color: '#4D4D4D',
  },
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
});

export default Todo;
