import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './styles.css';

function Comments({ timer }) {
  const counterDefaultState = timer;
  const [counter, setCounter] = React.useState(counterDefaultState);
  const [reset, setReset] = React.useState(true);
  const [comments, setComments] = React.useState(null);
  const [getComments, setGetComments] = React.useState(true);
  const [boldComment, setBoldComment] = React.useState(null);

  const selected = useSelector(state => state.selected);

  useEffect(() => {
    if (getComments) {
      setGetComments(false);
      try {
        const fetchData = async () => {
          let res = await fetch(
            'https://jsonplaceholder.typicode.com/comments?postId=1'
          );
          let response = await res.json();
          if (response) {
            setReset(true);
            setComments(response);
          } else {
            setReset(false);
          }
        };
        fetchData();
      } catch (err) {
        console.warning('error: ', err);
      }
    }
  }, [getComments]);

  useEffect(() => {
    if (reset && counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    } else if (reset) {
      setReset(false);
      setGetComments(true);
      setCounter(counterDefaultState);
    }
  }, [counter, counterDefaultState, reset]);


  useEffect(() => {
    if (selected && selected.length > 0) {
      setBoldComment(selected.length);
    }
  }, [selected]);

  let minutes = Math.floor(Number(counter) / 60);
  let seconds = Number(counter) - minutes * 60;
  if (String(minutes).length === 1) minutes = '0' + minutes;
  if (String(seconds).length === 1) seconds = '0' + seconds;


  const renderComments = () => {
    if (!Array.isArray(comments)) return;
    return comments.slice(0, 10).sort((a, b) => b.id - a.id).map((i) => {
      if (i.id === boldComment) {
        return <div key={i.id}><strong>{i.name}</strong></div>
      }
      return <div key={i.id}>{i.name}</div>
    })
  }


  return (
    <div>
      <div className='timer'>{minutes + ':' + seconds}</div>
        {comments && renderComments()}
    </div>
  );
}
export default Comments;
