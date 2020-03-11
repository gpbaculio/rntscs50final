import React, {useState, useContext} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {TodosContext} from './';
import {AuthContext} from '../../components/Root';

const TodoInputSchema = Yup.object().shape({
  text: Yup.string().required('Required'),
});

const TodoInput = () => {
  const {todos, setTodos} = useContext(TodosContext);
  const {user} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  return (
    <View style={styles.inputContainer}>
      <TouchableOpacity>
        <Text
          style={[
            styles.completeAll,
            todos.every(({complete}) => complete) && styles.completeFilterColor,
          ]}>
          {String.fromCharCode(10003)}
        </Text>
      </TouchableOpacity>
      <Formik
        initialValues={{
          text: '',
        }}
        validationSchema={TodoInputSchema}
        onSubmit={(values, {resetForm, setFieldError}) => {
          setLoading(true);
          fetch(
            `https://5e65ab532aea440016afb25f.mockapi.io/users/${
              user!.id
            }/todos`,
            {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({text: values.text, complete: false}),
            },
          )
            .then(response => response.json())
            .then(
              todo => {
                if (todo) {
                  setTodos([todo, ...todos]);
                  setLoading(false);
                  resetForm();
                }
              },
              addTodoError => {
                setFieldError('text', addTodoError);
                setLoading(false);
                resetForm();
              },
            );
        }}>
        {({values, handleChange, handleSubmit, touched, errors}) => (
          <>
            <TextInput
              editable={!loading}
              returnKeyType="done"
              onSubmitEditing={handleSubmit}
              blurOnSubmit={false}
              placeholder="What needs to be done?"
              style={styles.input}
              onChangeText={handleChange('text')}
              value={values.text}
            />
            {touched.text && errors.text && (
              <Text style={styles.errorMessage}>{errors.text}</Text>
            )}
          </>
        )}
      </Formik>
    </View>
  );
};

export default TodoInput;

const styles = StyleSheet.create({
  errorMessage: {fontSize: 10, color: 'red'},
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
