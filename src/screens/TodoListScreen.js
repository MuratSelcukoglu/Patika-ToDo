import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';

import Todo from '../components/Todo';

let lastId = 0;

function TodoListScreen() {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [completedTask, setCompletedTask] = useState(0);

  function handleSaveTodo() {
    if (todo === '') return alert('Henüz todo girmediniz');
    setTodoList([...todoList, {id: lastId++, todo, completed: false}]);
    setTodo('');
  }

  const toggleTodo = item => {
    const newTodoList = todoList.map(t =>
      t.id === item.id ? {...t, completed: !t.completed} : t,
    );
    console.log(newTodoList);
    setTodoList(newTodoList);
  };

  useEffect(() => {
    const list = todoList.filter(todo => !todo.completed);
    setCompletedTask(list);
  }, [todoList]);

  return (
    <SafeAreaView style={styles.appContainer}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Yapılacaklar</Text>
          <Text style={styles.title}>{completedTask.length}</Text>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            data={todoList}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <Todo onToggle={() => toggleTodo(item)} item={item} />
            )}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            value={todo}
            onChangeText={setTodo}
            placeholder="Yapılacak..."
            style={styles.textInput}
          />
          <Pressable onPress={handleSaveTodo}>
            <View
              style={[
                styles.buttonContainer,
                todo !== '' && {backgroundColor: 'yellow'},
              ]}>
              <Text style={[styles.text, todo !== '' && {color: 'black'}]}>
                Kaydet
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: '#313131',
    flex: 1,
  },
  container: {
    width: '100%',
    height: 200,
    padding: 20,
    flex: 1,
    justifyContent: 'space-between',
  },

  listContainer: {
    flex: 1,
    marginTop: 20,
  },
  inputContainer: {
    backgroundColor: '#565656',
    paddingBottom: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#696969',
    marginHorizontal: 20,
    borderRadius: 20,
  },
  textInput: {
    padding: 10,
    fontSize: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#ededed',
    margin: 10,
    color: 'white',
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: 'yellow',
    fontSize: 32,
  },
});

export default TodoListScreen;
