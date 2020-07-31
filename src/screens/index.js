import React, { useState } from 'react';
import Table from '../components/Table/index';
import Container from '../components/Container/index';
import { useSelector } from 'react-redux';
import Comments from '../components/Comments/index';
import Button from '../components/Button/index';
import { useDispatch } from 'react-redux';
import { updatePressedButtons } from '../redux/actions';



function Home() {
  const columns = 10;
  const buttons = 80;
  const maxSelected = 12;
  const rows = Math.ceil(buttons / columns)

  const timerSeconds = 180;

  const dispatch = useDispatch();
  const selected = useSelector(state => state.selected);

  const [bet, setBet] = useState('1.00');
  const [draws, setDraws] = useState(null);



  const buttonClicked = (id) => {
    let newState;
    if (selected.includes(id)) {
      newState = selected.filter((i) => i !== id)
    } else {
      newState = selected.concat(id);
    }

    dispatch(updatePressedButtons(newState));
  }

  const isDisabled = (id) => {
    if (selected.length >= maxSelected && !selected.includes(id)) {
      return true
    }
    return false
  }

  const getButtonClass = (id) => {
    if (selected.includes(id)) {
      return 'selected'
    }
    return null
  }

  const getData = (number) => {
    const result = [];
    for (let i = 0; i < number; i++) {
      result.push(<Button getClass={getButtonClass} isDisabled={isDisabled} onClick={buttonClicked} id={i + 1} >{i + 1}</Button>)
    }
    return result;
  }

  const handleBetChange = (event) => {
    let value = event.target.value;
    if (isNaN(value)) return;
    value = String(value);
    if (value.charAt(0) === '0' || (value.includes('.') && value.substring(value.indexOf('.'), value.length - 1).length > 2)) return;
    setBet(value);
  }

  const handleDrawsChange = (event) => {
    let value = event.target.value;
    if (!Number.isInteger(Number(value)) || value.includes('.')) return;
    setDraws(event.target.value);

  }

  const decreaseBet = () => {
    if (bet >= 0.2) {
      let decreased = Math.round((Number(bet) - 0.2) * 100) / 100
      setBet(decreased.toFixed(2))
    }
  }

  const increaseBet = () => {
    let increased = Math.round((Number(bet) + 0.2) * 100) / 100
    setBet(increased.toFixed(2))
  }

  const decreaseDraws = () => {
    if (draws >= 1) {
      setDraws(Number(draws) - 1)
    }
  }
  const increaseDraws = () => {
    setDraws(Number(draws) + 1)
  }

  const price = (Math.round((bet * draws * selected.length) * 100) / 100).toFixed(2)

  return (
    <div>
      <Comments timer={timerSeconds} />
      <Container>
        <Table rows={rows} columns={columns} data={getData(buttons)} />
      </Container>
      <div>Въведете залог:</div>
      <button onClick={decreaseBet}>-</button>
      <input type='text' value={bet} onChange={handleBetChange} />
      <button onClick={increaseBet}>+</button>
      <div>Въведете брой тегления:</div>
      <button onClick={decreaseDraws}>-</button>
      <input type="text" min='1' value={draws} onChange={handleDrawsChange} />
      <button onClick={increaseDraws}>+</button>
      <div>Цена:</div>
      <input type="number" value={price} disabled />
    </div>
  );
}

export default Home;
