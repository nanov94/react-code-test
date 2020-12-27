import s from './Loading.module.scss';

const Loading = () => {
    return (
        <div className={s.wrapLoading}>
            <div className={s.firstPulsatingCircle} />
            <div className={s.secondPulsatingCircle} />
            <div className={s.smallCircle} />
        </div >
    );
}

export default Loading;
