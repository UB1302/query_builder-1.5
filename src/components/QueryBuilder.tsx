import React, { useEffect, useState } from 'react';
import FilterBox from './FilterBox';
import {RuleGroup} from "../App"

interface QueryBuilderProps {
    setOpenQueryBuilder: React.Dispatch<React.SetStateAction<boolean>>
}


// export interface QueryArrayInterface {
//     id:number
//     data: RuleGroup["children"]
// }
// export type conjunctionType = {
//     value: "AND" | "OR"
// }

const QueryBuilder: React.FC<QueryBuilderProps> = ({setOpenQueryBuilder}) => {

    const [humanReadableQuery,setHumanReadableQuery] = useState<string>("")
    const [result, setResult] = useState<RuleGroup>()
    const [showInputBox,setShowInputBox] = useState<boolean>(false)
    const [queryArray,setQueryArray] = useState<RuleGroup["children"]>([])
    const [conjunction,setConjunction] = useState("AND")
    console.log(queryArray)

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
            console.log(tempArray)
        tempArray.sort(function (a, b) {
            return a.id - b.id;
          });
          console.log(tempArray)
          setResult({
              id: 0,
              children: tempArray,
              conjunction: conjunction as RuleGroup['conjunction'],
              not: false,
              type: 'rule_group'
          })
        //   let str = "";
        //   tempArray.forEach((item)=>{
        //     str = str + item.field + item.condition + item.criteria
        //   })
        //   console.log(str)
        // //   setHumanReadableQuery()
        // setHumanReadableQuery(str)
        }
        
    },[queryArray,conjunction])

    useEffect(()=>{
        if(result){
            let str = "";
            result.children.forEach((item)=>{
                str = str + item.field + " " + item.condition + " \\" + item.criteria + "\\ " + result.conjunction + " "
            })
            console.log(str);
            setHumanReadableQuery(str);
        }
    },[result])

    

    return (
        <div className="backdrop" onClick={handleClick}>
            <div className= "modal-content bg-gray-900 text-base rounded-md">
                <div className = "bg-indigo-500 rounded-t p-5">
                    {showInputBox ? 
                        <h1 className = "text-2xl">Build your query</h1> : 
                        <h1 className = "text-2xl">Create tag and query</h1>
                    }
                    
                    {showInputBox ? 
                        <div className= "mt-3"><p className = "bg-white text-black">{humanReadableQuery}</p></div> : 
                        <p className = "text-sm text-gray-400">The query you build will be saved in your active view</p>
                    }
                </div>
                
                <FilterBox queryArray = {queryArray} setQueryArray = {setQueryArray} conjunction = {conjunction}  setConjunction = {setConjunction}/>
                <div>
                    <button className = "bg-indigo-500 p-2 px-5 rounded-md">Finish</button>
                </div>
            </div>
        </div>
    )
}

export default QueryBuilder;