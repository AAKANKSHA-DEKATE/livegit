import React from 'react';
import './App.css';
import GoalList from './components/GoalList/GoalList';
import NewGoal from './components/NewGoal/NewGoal';

const App = () => {
  const courseGoals = [
    {id: 'cg1', text: 'Finish the course'},
    {id: 'cg2', text: 'Learn all about the course Main Topics'},
    {id: 'cg3', text: 'Help other students in the course'}
  ];

  return (
    <div className= "course-goals">
      <h2>Course Goals</h2>
      <NewGoal />
      <GoalList goals = {courseGoals}/>
    </div>
  );
}; // This is a React based functional component. Modern way to use React.

// class App extends React.Component {
//   render() {
//     return <h1 title="This works!">Hi, this is ReactJS!</h1>
//   }
// } // This is a regular React Component. Both display the same output.

export default App;
