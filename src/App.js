import { useState } from "react";
import "./App.css";
import Alert from "./components/Alert";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

const App = () => {

  const [charge, setCharge] = useState('');
  const [id, setId] = useState(0);
  const [edit, setEdit] = useState(false);
  const [amount, setAmount] = useState(0);

  const [alert, setAlert] = useState({ show: false });

  const [expenses, setExpenses] = useState([
    { id: 1, charge: '렌트비', amount: 1600 },
    { id: 2, charge: '교통비', amount: 400 },
    { id: 3, charge: '식비', amount: 1200 }
  ])

  const clearItems = () => {
    setExpenses([]);
  }

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     expenses: [
  //       { id: 1, charge: '렌트비', amount: 1600 },
  //       { id: 2, charge: '교통비', amount: 400 },
  //       { id: 3, charge: '식비', amount: 1200 }
  //     ]
  //   } 
  // }

  // initialExpenses = [
  //   { id: 1, charge: '렌트비', amount: 1600 },
  //   { id: 2, charge: '교통비', amount: 400 },
  //   { id: 3, charge: '식비', amount: 1200 }
  // ]

  const handleCharge = (e) => {
    console.log(e.target.value);
    setCharge(e.target.value);
  }

  const handleAmount = (e) => {
    console.log(e.target.valueAsNumber);
    setAmount(e.target.valueAsNumber);
  }

  const handleDelete = (id) => {
    const newExpense = expenses.filter(expense => expense.id !== id);
    console.log(newExpense);
    setExpenses(newExpense);
    handleAlert({ type: 'danger', text: '항목이 삭제되었습니다.' });
    // this.setState({
    //   expenses: newExpense
    // });
  }

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });

    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  }

  const handleEdit = (id) => {
    const expense = expenses.find(item => item.id === id);
    const { charge, amount } = expense;
    setId(id);
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(charge !== '' && amount > 0) {
      if (edit) {
        const newExpense = expenses.map(item => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(newExpense);
        setEdit(false);
        handleAlert({ type: 'success', text: '항목이 수정되었습니다.' });
      } else {
        const newExpense = { id: crypto.randomUUID(), charge, amount };
        // 불변성을 지켜주기 위해서 새로운 expenses 를 생성
        const newExpenses = [...expenses, newExpense];
        setExpenses(newExpenses);
        handleAlert({ type: 'success', text: '항목이 추가되었습니다.' });
      }

      setCharge('');
      setAmount(0);
    } else {
      console.log('charge or amount is empty')
      handleAlert({ type: 'danger', text: 'charge는 빈값일 수 없으며, amount는 0보다 커야합니다.' });
    }
  }

    return(
      <main className="main-container">
        {alert.show ? <Alert type={alert.type} text={alert.text}/> : null}
        <h1>예산 계산기</h1>

        <div style={{ width: '100%', backgroundColor: 'white', padding: '1rem'}}>
          <ExpenseForm 
            handleCharge={handleCharge}
            charge={charge}
            handleAmount={handleAmount}
            amount={amount}
            handleSubmit={handleSubmit}
            edit={edit}
          />
        </div>

        <div style={{ width: '100%', backgroundColor: 'white', padding: '1rem'}}>
          <ExpenseList 
            expenses={expenses} 
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            clearItems={clearItems}/>
        </div>

        <div style={{ display: 'flex', justifyContent: 'end', marginTop: '1rem'}}>
          <p style={{ fontSize: '2rem'}}>
            총 지출: 
            <span>
              {expenses.reduce((acc, curr) => {
                return (acc += curr.amount);
              }, 0)}
              원
            </span>
          </p>
        </div>
      </main>
    )
}

export default App;
