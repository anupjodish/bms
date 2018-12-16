import React from 'react'

const Results = (props) => {
  // const options = props.results.map(r => (
  //   <li key={r.id}>
  //     {r.name}
  //   </li>
  // ))

  return <div className="message">
      {props.results.length>0?
          <div><div className="title">
              {props.title}
          </div>
          <div className="numbers">
              {props.results.join(',')}
        </div></div>
        : <div/>}
  </div>
}

export default Results
