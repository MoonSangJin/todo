import React from 'react';
import styles from '../styles/Home.module.css';
import '@fortawesome/fontawesome-free/js/all.js';
import produce from 'immer';

import { Todo } from '../interfaces';
import Header from '../components/header';
import AddForm from '../components/addForm';
import { useTodoList } from '../hooks/useTodoList';
import BeatLoader from 'react-spinners/BeatLoader';
import { useSession, signIn, signOut } from 'next-auth/react';
import naverLoginButtonImage from '../public/naverLogin/btnG_축약형.png';
import Image from 'next/image';

const loadingStyle = {
  position: 'fixed' as 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

export default function Home() {
  const { status } = useSession();

  if (status === 'unauthenticated') {
    return (
      <div style={loadingStyle}>
        <div
          style={{ fontSize: '2rem', textAlign: 'center', fontWeight: 'bold' }}
        >
          Jin ToDoList
        </div>
        <Image
          src={naverLoginButtonImage}
          alt='NaverLoginButton'
          width={300}
          height={120}
          onClick={() => signIn('naver')}
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <TodoList />
    </div>
  );
}

const TodoList = () => {
  const { todoList, isLoading } = useTodoList();
  return isLoading ? (
    <div style={loadingStyle}>
      <BeatLoader color='#0C9FF2' size={20} />
    </div>
  ) : (
    <div>
      <Header totalCount={todoList.length} />
      <ul className={styles.todos}>
        {todoList.map((todo) => (
          <Todo
            key={
              todo.id +
              '/' +
              todo.fields.Name +
              '/' +
              (todo.fields.Done ? 'O' : 'X') +
              '/' +
              (todo.fields.Who ? 'yes' : 'no')
            }
            todo={todo}
          />
        ))}
      </ul>
      <AddForm />
    </div>
  );
};

const Todo = (props: { todo: Todo }) => {
  const { todo } = props;
  const { updateTodo, deleteTodo } = useTodoList();
  const { data: session } = useSession();

  const checkType = todo.fields.Done === true ? styles.done : styles.yet;

  const handleUpdateTodo = () => {
    const updated = produce(todo, (nextTodo) => {
      nextTodo.fields.Done = !todo.fields.Done;
    });
    updateTodo(updated);
  };

  const handleDeleteTodo = (id: string) => {
    session.user.name === '문상진' ? deleteTodo(id) : warnToNoAdmin();
  };

  const warnToNoAdmin = () => {
    alert(`${session.user.name}님 당신은 삭제 권한이 없습니다.`);
  };

  return (
    <li className={`${styles.todo} ${checkType}`}>
      <span className={styles.todoName}>{todo.fields.Name}</span>
      <div className={styles.btns} onClick={handleUpdateTodo}>
        <button
          className={`${styles.btnCheck} ${checkType}`}
          onClick={handleUpdateTodo}
        ></button>
        <button
          className={`${styles.btnDelete} ${checkType}`}
          onClick={() => handleDeleteTodo(todo.id)}
        >
          <i className='fas fa-trash'></i>
        </button>
      </div>
    </li>
  );
};
