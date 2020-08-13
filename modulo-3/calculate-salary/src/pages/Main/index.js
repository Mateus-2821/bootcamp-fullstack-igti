import React, { useState } from 'react'

import { calculateSalaryFrom } from '../../helpers/salary'

import Input from '../../components/Input'
import Output from '../../components/Output'
import Bar from '../../components/Bar'

const Main = () => {
  const [salary, setSalary] = useState(3900)
  const { discountINSS, percentINSS, baseIRPF, discountIRPF, percentIRPF, netSalary, percentNetSalary } = calculateSalaryFrom(salary)

  return (
    <main>
      <section>
        <Input text="Salário Bruto" value={salary} handleChange={event => setSalary(event.target.value)}/>
        <Output text="Base INSS" format="R$" value={salary} />
        <Output text="Desconto INSS" value={discountINSS} percent={`(${percentINSS}%)`} />
        <Output text="Base IRPF" value={baseIRPF} />
        <Output text="Desconto IRPF" value={discountIRPF} percent={`(${percentIRPF}%)`} />
        <Output text="Salário Líquido INSS" value={netSalary} percent={`(${percentNetSalary}%)`} />
      </section>
      <div>
        <Bar width={percentINSS} color="#e67e22"></Bar>
        <Bar width={percentIRPF} color="#c0392b"></Bar>
        <Bar width={percentNetSalary} color="#16a085"></Bar>
      </div>
    </main>
  )
}

export default Main