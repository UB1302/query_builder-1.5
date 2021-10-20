import { useEffect, useState } from 'react';
import FilterBox from './FilterBox';
import {RuleGroup} from "../App"
import axios from "axios"

interface QueryBuilderProps {
    setOpenQueryBuilder: React.Dispatch<React.SetStateAction<boolean>>
}
interface extraFilterBoxesInterface {// To keep track of filters added by user other then the default filter
    extraFilterBoxes: {
         id: number
     }[]
 }

const QueryBuilder: React.FC<QueryBuilderProps> = ({setOpenQueryBuilder}) => {

    const [humanReadableQuery,setHumanReadableQuery] = useState<string>("")
    const [result, setResult] = useState<RuleGroup>({
        id:100,
        children: [],
        conjunction: "AND",
        not: false,
        type: 'rule_group'
    })
    const [resultChildren, setResultChildren] = useState<RuleGroup['children']>([])
    const [showInputBox,setShowInputBox] = useState<boolean>(false)
    const [numberOfExtraFilterBoxes, setNumberOfExtraFilterBoxes] = useState<number>(1)
    const [listOfExtraFilterBoxes,setListOfExtraFilterBoxes] = useState<extraFilterBoxesInterface["extraFilterBoxes"]>([])

    const [conjunction,setConjunction] = useState("AND")
    // console.log("resultChildren: " + JSON.stringify(resultChildren))
    // console.log("result: " + JSON.stringify(result))

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
        if(resultChildren){
            let tempArray = resultChildren
            // console.log("resultChildren: " + tempArray)
            // // tempArray.sort(function (a, b) {
            // //     return a.id - b.id;
            // // });
          setResult({
              id: 0,
              children: resultChildren,
              conjunction: conjunction as RuleGroup['conjunction'],
              not: false,
              type: 'rule_group'
          })
        } 
    },[resultChildren,conjunction])

    useEffect(()=>{
        if(result){
            let str = "";
            console.log(result.children)
            // let i = new Map(JSON.stringify(result.children))
            // console.log(new Map(result.children))
            // resultChildren.forEach(item => {
            //     item.
            // })
            //     let i = item.children
            //     let i = JSON.stringify(item)
            //     console.log("item: " + i)
                // let conjunctionSymbol = result.conjunction === "AND" ? "&&" : "||"

                // str = str + "\"(field."+item.field + ") " + item.condition + " \\\"" + item.criteria + "\"\\\" " + conjunctionSymbol + " "
                
            // })
            // str = str.substring(0,str.length-4)
            // setHumanReadableQuery(str);
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
    const addHandler = () => {
        // setShowOperator(true)
        let extraFilterBox = {
            id:numberOfExtraFilterBoxes,
        }
        setListOfExtraFilterBoxes([...listOfExtraFilterBoxes,extraFilterBox])
        setNumberOfExtraFilterBoxes(prevCount => prevCount + 1)
    }
    const deleteExtraFilterBox = (id:number) => {
        let temp = [...listOfExtraFilterBoxes].filter((item)=>item.id !== id)
        let tempQueryArray = [...resultChildren].filter((item)=>item.id !== id)
        setResultChildren(tempQueryArray)
        setListOfExtraFilterBoxes(temp)
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
                
                <FilterBox id = {0} resultChildren = {resultChildren} setResultChildren = {setResultChildren} showDeleteButton = {false} deleteExtraFilterBox = {deleteExtraFilterBox}/>
                {listOfExtraFilterBoxes.map((item)=>{
                return <FilterBox id = {item.id} key = {item.id} resultChildren = {resultChildren} setResultChildren = {setResultChildren} showDeleteButton = {true} deleteExtraFilterBox = {deleteExtraFilterBox}/>
                })}
                <div onClick = {addHandler} className ="flex flex-row content-center bg-secondary rounded-md text-sm w-44 p-0.5 ml-7 cursor-pointer">
                    <div className ="p-1 ml-1 mt-px">
                        <span className ="material-icons-outlined text-xs">add</span>
                    </div>
                    <p className ="pt-1 pr-0.5">Add new group filter</p>
                </div>
                <div className = "flex justify-between mt-20 mr-2 mb-2">
                    <button onClick = {closeHandler} className = "bg-gray-seventh p-2 ml-3 w-20 rounded-md">Back</button>
                    <button onClick = {submitHandler} className = "bg-secondary p-2 w-20 rounded-md">Finish</button>
                </div>
                
            </div>
        </div>
    )
}

export default QueryBuilder;