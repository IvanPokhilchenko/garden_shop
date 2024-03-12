import styles from './Burger.module.css';

export const Burger = ({ active, ...other }) => {
	return (
		<div className={`${styles.burger} ${styles[active]}`} {...other}>
			<span className={styles.burger_line1}></span>
			<span className={styles.burger_line2}></span>
		</div>
	);
};