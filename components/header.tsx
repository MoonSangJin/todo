import React, { memo, useEffect } from 'react';
import styles from '../styles/Header.module.css';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import naverLogOutButtonImage from '../public/naverLogin/btnG_로그아웃.png';

const Header = (props: { totalCount: number }) => {
  const { data: session } = useSession();
  const { totalCount } = props;

  const today = new Date();
  const date = today.getDate();
  const year = today.getFullYear();

  const arrMonths = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  let month = arrMonths[today.getMonth()];

  const arrDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  let day = arrDays[today.getDay()];

  return (
    <header className={styles.header}>
      <section>
        <Image
          src={naverLogOutButtonImage}
          alt='naverLogOut'
          width={100}
          height={40}
          onClick={() => signOut()}
        />
        <div style={{ display: 'flex' }}>
          <Image
            src={session.user.image}
            alt='profileImage'
            width={100}
            height={100}
          />
        </div>
        <strong>Welcome {session.user.name}</strong>
      </section>
      <section className={styles.todayInfo}>
        <div className={styles.todayInfoLeft}>
          <span className={styles.date}>{date}</span>
          <div className={styles.monthYear}>
            <div className={styles.month}>{month}</div>
            <div className={styles.year}>{year}</div>
          </div>
        </div>
        <span className={styles.day}>{day}</span>
      </section>
      <section className={styles.todayCount}>
        <h1 className={styles.title}>TO DO LIST</h1>
        <span className={styles.count}>{totalCount}</span>
      </section>
    </header>
  );
};

export default memo(Header);
