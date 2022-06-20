import React, { memo, useRef, KeyboardEvent } from 'react';
import styles from '../styles/AddForm.module.css';
import { useTodoList } from '../hooks/useTodoList';

const AddForm = () => {
  const { addNewTodo } = useTodoList();
  const inputRef = useRef<HTMLInputElement>(null);

  const addTodo = () => {
    const name = inputRef.current?.value;
    name && addNewTodo(name);
    if (inputRef.current) inputRef.current.value = '';
  };

  const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') addTodo();
  };

  return (
    <div className={styles.addForm}>
      <button className={styles.addBtn} onClick={addTodo}>
        <i className='fas fa-plus'></i>
      </button>
      <input
        ref={inputRef}
        className={styles.addInput}
        type='text'
        placeholder='Create a new Todo'
        onKeyPress={onKeyPress}
      />
    </div>
  );
};

export default memo(AddForm);
