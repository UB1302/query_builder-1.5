import './App.css';
import "./components/Dashboard"
import Dashboard from './components/Dashboard';

export interface Rule {
  id: number
  field?: 'Theme' | 'Sub-theme' | 'Reason' | 'Language' | 'Source' | 'Rating' | 'Time Period' | 'Customer ID' 
  condition?: 'Equals' | 'Does not equal' | 'Like' | 'Not like' | 'Is Empty' | 'Is' | 'Is not'
  criteria?: string
  type: 'rule'
}

export interface RuleGroup {
  id:number
  children: Rule[];
  conjunction: 'AND' | 'OR'
  not: boolean
  type: 'rule_group'
}

function App() {
  return (
    <div className="App bg-black">
      <Dashboard/>
    </div>
  );
}

export default App;
