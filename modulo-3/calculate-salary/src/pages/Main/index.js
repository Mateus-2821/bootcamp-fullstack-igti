import React, { useState } from 'react'

import { calculateSalaryFrom } from '../../helpers/salary'

import Input from '../../components/Input'
import Output from '../../components/Output'

const Main = () => {
  const [salary, setSalary] = useState(3900)
  const { discountINSS, percentINSS, baseIRPF, discountIRPF, percentIRPF, netSalary, percentNetSalary } = calculateSalaryFrom(salary)

  return (
    <main>
      <Input text="Salário Bruto" value={salary} handleChange={event => setSalary(event.target.value)}/>
      <Output text="Base INSS" format="R$" value={salary} />
      <Output text="Desconto INSS" value={discountINSS} percent={percentINSS} />
      <Output text="Base IRPF" format="R$" value={baseIRPF} />
      <Output text="Desconto IRPF" value={discountIRPF} percent={percentIRPF} />
      <Output text="Salário Líquido INSS" value={netSalary} percent={percentNetSalary} />
    </main>
  )
}

export default Main