import React from 'react'

const Results = (props) => {
  // const options = props.results.map(r => (
  //   <li key={r.id}>
  //     {r.name}
  //   </li>
  // ))
  return <div className="message">{props.results[0]}</div>
}

export default Results
