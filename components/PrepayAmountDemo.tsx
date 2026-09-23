'use client';

import {useState} from 'react';
import s from './PrepayCaseStudy.module.css';

export default function PrepayAmountDemo() {
  const [amount, setAmount] = useState(100000);
  const rate = amount >= 100000 ? 10 : 2;
  const bonus = amount * rate / 100;
  const number = (value:number) => value.toLocaleString('ko-KR');
  return <div className={s.calculator}>
    <div className={s.calculatorTop}><span>선결제 금액을 골라보세요</span><span>계산 예시</span></div>
    <div className={s.amountOptions} role="group" aria-label="적립금 계산 예시 금액">
      {[50000,100000,200000,300000].map(value => <button key={value} type="button" aria-pressed={value === amount} onClick={() => setAmount(value)}>{value / 10000}만 원</button>)}
    </div>
    <div className={s.equation} aria-live="polite" aria-atomic="true">
      <div><span>선결제 금액</span><strong>{number(amount)}<small>원</small></strong></div>
      <span className={s.operator} aria-hidden="true">＋</span>
      <div><span>추가 적립 {rate}%</span><strong className={s.bonus}>{number(bonus)}<small>P</small></strong></div>
      <span className={s.operator} aria-hidden="true">＝</span>
      <div className={s.total}><span>총 충전 예정</span><strong>{number(amount + bonus)}<small>P</small></strong></div>
    </div>
    <p className={s.calculatorNote}>프로토타입에 표시된 적립 기준입니다. 여기서는 계산만 체험하며, 결제나 포인트 충전은 진행되지 않습니다.</p>
  </div>;
}
