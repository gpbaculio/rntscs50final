import React from 'react';
import {View, TextInput, Button, Text, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {AuthContext} from '../components/Root';

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string().required('Required'),
});

const Signin = () => {
  const {signIn, loading} = React.useContext(AuthContext);
  return (
    <Formik
      initialValues={{
        email: 'eve.holt@reqres.in',
        password: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={values => {
        if (signIn) {
          signIn(values.email, values.password);
        }
      }}>
      {({values, handleChange, handleSubmit, touched, errors}) => (
        <View>
          <Text>Authentication demo, cannot change email</Text>
          <TextInput
            placeholder="Email"
            value={values.email}
            editable={false}
            onChangeText={handleChange('email')}
          />
          {touched.email && errors.email && (
            <Text style={styles.errorMessage}>{errors.email}</Text>
          )}
          <TextInput
            placeholder="Password"
            value={values.password}
            onChangeText={handleChange('password')}
            secureTextEntry
          />
          {touched.password && errors.password && (
            <Text style={styles.errorMessage}>{errors.password}</Text>
          )}
          <Button disabled={loading} title="Sign in" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

export default Signin;

const styles = StyleSheet.create({
  errorMessage: {fontSize: 10, color: 'red'},
});
