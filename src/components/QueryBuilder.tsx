import { useEffect, useState } from 'react';
import FilterBox from './FilterBox';
import {RuleGroup} from "../App"
import axios from "axios"

interface QueryBuilderProps {
    setOpenQueryBuilder: React.Dispatch<React.SetStateAction<boolean>>
}

const QueryBuilder: React.FC<QueryBuilderProps> = ({setOpenQueryBuilder}) => {

    const [humanReadableQuery,setHumanReadableQuery] = useState<string>("")
    const [result, setResult] = useState<RuleGroup>()
    const [showInputBox,setShowInputBox] = useState<boolean>(false)
    const [queryArray,setQueryArray] = useState<RuleGroup["children"]>([])
    const [conjunction,setConjunction] = useState("AND")

    const handleClick = (e:any):void => {
        if(e.target.classList.contains('backdrop')){
            setOpenQueryBuilder(false)
        }
    }

    useEffect(()=>{
        let timeoutID = setTimeout(()=>{
            setShowInputBox(true)
        },5000)
        return ()=>{
            clearTimeout(timeoutID);
        }
    },[])

    useEffect(()=>{
        if(queryArray){
            let tempArray = queryArray
            tempArray.sort(function (a, b) {
                return a.id - b.id;
            });
          setResult({
              id: 0,
              children: tempArray,
              conjunction: conjunction as RuleGroup['conjunction'],
              not: false,
              type: 'rule_group'
          })
        } 
    },[queryArray,conjunction])

    useEffect(()=>{
        if(result){
            let str = "";
            result.children.forEach((item)=>{
                let conjunctionSymbol = result.conjunction === "AND" ? "&&" : "||"
                str = str + "\"(field."+item.field + ") " + item.condition + " \\\"" + item.criteria + "\"\\\" " + conjunctionSymbol + " "
                
            })
            str = str.substring(0,str.length-4)
            setHumanReadableQuery(str);
        }
    },[result])

    const closeHandler = () => {
        setOpenQueryBuilder(false)
    }

    const submitHandler = () => {
        axios.post('https://jsonplaceholder.typicode.com/posts', {
                humanReadableFormat: humanReadableQuery,
                ruleObjectFormat: result
        }).then(function(response){
            console.log("status: "+ response.status)
            console.log(response.data)
        })
    }

    return (
        <div className="backdrop" onClick={handleClick}>
            <div className= "modal-content bg-primary  text-base rounded-md overflow-y-auto relative">
                <div className = "bg-secondary rounded-t p-5 relative">
                    {showInputBox ? 
                        <h1 className = "text-2xl">Build your query</h1> : 
                        <h1 className = "text-2xl">Create tag and query</h1>
                    }
                    
                    {showInputBox ? 
                        <div className= "mt-3"><p className = "bg-white text-white bg-fourth p-1 rounded text-sm"><span className="font-semibold">Query: </span>{humanReadableQuery}</p></div> : 
                        <p className = "text-sm text-gray-400">The query you build will be saved in your active view</p>
                    }

                    <span onClick = {closeHandler} className="material-icons-outlined absolute top-2 right-2 pt-0.5 bg-fourth cursor-pointer">close</span>
                </div>
                
                <FilterBox queryArray = {queryArray} setQueryArray = {setQueryArray} conjunction = {conjunction}  setConjunction = {setConjunction}/>
                <div className = "flex justify-between mt-20 mr-2 mb-2">
                    <button onClick = {closeHandler} className = "bg-gray-seventh p-2 ml-3 w-20 rounded-md">Back</button>
                    <button onClick = {submitHandler} className = "bg-secondary p-2 w-20 rounded-md">Finish</button>
                </div>
                
            </div>
        </div>
    )
}

export default QueryBuilder;