window.GRAMMAR = {
'p5-noun': {
  intro: '빈칸 앞뒤만 보고 품사를 정하는 문제의 절반은 명사 자리입니다. 자리를 찾은 다음 **가산/불가산**, **사람/사물**까지 확인해야 850 이상 함정을 피할 수 있어요.',
  rules: [
    { h: '관사·소유격·형용사 **뒤**는 명사', p: 'a/an/the, my/its/their, this/each, 형용사 다음에 빈칸이 오고 그 뒤에 전치사나 동사가 이어지면 명사 자리입니다.',
      ex: [['The prompt approval of the budget allowed construction to begin.', '예산이 신속히 승인되어 공사를 시작할 수 있었다.'], ['Its recent expansion into Asia doubled revenue.', '최근의 아시아 진출로 매출이 두 배가 되었다.']] },
    { h: '전치사 뒤, 타동사 뒤도 명사', p: '전치사 다음에는 명사나 동명사가 옵니다. 뒤에 목적어가 없으면 명사, 목적어가 있으면 동명사를 고르세요.',
      ex: [['Please contact us for assistance with the installation.', '설치에 도움이 필요하면 연락 주세요.'], ['We appreciate your cooperation.', '협조에 감사드립니다.']] },
    { h: '가산 단수 명사는 혼자 못 쓴다', p: '보기 중 가산 단수 명사(approach, plan, request)는 앞에 관사·소유격이 있어야 합니다. 빈칸 앞에 아무것도 없으면 복수형이나 불가산 명사를 고르세요.',
      ex: [['Applicants must submit references from previous employers.', '지원자는 이전 고용주의 추천서를 제출해야 한다.'], ['The firm offers advice on tax matters.', '그 회사는 세무 문제에 관한 조언을 제공한다.']] },
    { h: '사람 명사 vs 사물·행위 명사', p: '같은 어근에서 나온 두 명사가 보기에 함께 나오면 동사·관사·수 일치로 가립니다. 사람이 하는 행위의 주체인지, 그 행위 자체인지 따져 보세요.',
      ex: [['Each applicant will be interviewed twice.', '지원자는 각각 두 번 면접을 본다. (application ✕)'], ['The consultation lasted an hour.', '상담은 한 시간 걸렸다. (consultant ✕)']] },
    { h: '복합명사는 앞 명사를 단수로', p: '명사+명사 조합은 앞 명사가 형용사 역할을 해서 단수 형태가 기본입니다. 단, sales, savings, customs, earnings처럼 원래 -s 형태로 굳은 말은 예외.',
      ex: [['The safety inspection is scheduled for Monday.', '안전 점검은 월요일로 잡혀 있다.'], ['Sales figures exceeded expectations.', '매출 수치가 예상을 웃돌았다.']] }
  ],
  listTitle: '헷갈리는 불가산·특이 명사',
  list: [['equipment', '장비 (불가산)'], ['furniture', '가구 (불가산)'], ['information', '정보 (불가산)'], ['merchandise', '상품 (불가산)'], ['luggage / baggage', '짐 (불가산)'], ['advice', '조언 (불가산)'], ['access', '접근, 이용 권한 (불가산)'], ['approval', '승인'], ['proposal', '제안(서)'], ['referral', '추천, 소개'], ['rental', '임대, 대여'], ['representative', '대표자, 직원'], ['initiative', '계획, 주도권'], ['alternative', '대안'], ['objective', '목표'], ['attendance / attendee', '출석(수) / 참석자'], ['supervision / supervisor', '감독 / 감독관'], ['savings', '저축액, 절약액']]
},
'p5-adj': {
  intro: '형용사 자리는 **명사 앞**과 **보어 자리** 두 곳입니다. 분사형 형용사와 뜻이 비슷한 쌍둥이 형용사가 고난도에서 자주 나와요.',
  rules: [
    { h: '명사 앞 수식', p: '관사와 명사 사이, 소유격과 명사 사이 빈칸은 형용사. 부사가 이미 있으면 "부사+형용사+명사" 구조인지 확인하세요.',
      ex: [['The company posted a considerable increase in profits.', '그 회사는 상당한 수익 증가를 기록했다.'], ['We need a highly reliable supplier.', '매우 믿을 만한 공급업체가 필요하다.']] },
    { h: '2형식 동사 뒤 보어', p: 'be, become, remain, seem, appear, stay, prove 뒤에는 부사가 아니라 형용사가 옵니다.',
      ex: [['Prices have remained stable for six months.', '가격이 여섯 달째 안정적이다.'], ['The new process proved effective.', '새 공정이 효과적인 것으로 드러났다.']] },
    { h: '5형식 목적격 보어', p: 'make, keep, find, consider, deem + 목적어 + 형용사. 목적어 뒤라서 부사를 고르기 쉬운 자리입니다.',
      ex: [['Please keep the hallway clear.', '복도를 비워 두세요.'], ['Many users found the interface confusing.', '많은 사용자가 그 화면이 헷갈린다고 느꼈다.']] },
    { h: '-ing / -ed 분사형 형용사', p: '감정 동사는 사람이 느끼면 -ed, 감정을 일으키는 대상이면 -ing. 일반 동사는 꾸미는 명사가 그 동작을 하면 -ing, 당하면 -ed.',
      ex: [['The results were disappointing.', '결과가 실망스러웠다.'], ['Only qualified candidates will be contacted.', '자격을 갖춘 후보자에게만 연락한다.'], ['the remaining balance', '남은 잔액']] },
    { h: '모양이 닮은 형용사 쌍', p: '어근이 같아도 뜻이 다릅니다. 문맥에 넣어 뜻으로 고르세요.',
      ex: [['She was considerate of her colleagues.', '그녀는 동료들을 배려했다. (considerable ✕)'], ['an economical car', '연비 좋은(경제적인) 차 (economic: 경제의)']] }
  ],
  listTitle: '자주 나오는 형용사 쌍',
  list: [['considerable / considerate', '상당한 / 사려 깊은'], ['reliable / reliant', '믿을 만한 / 의존하는'], ['economic / economical', '경제의 / 절약하는'], ['comprehensive / comprehensible', '포괄적인 / 이해할 수 있는'], ['successive / successful', '연속적인 / 성공적인'], ['respective / respectful', '각각의 / 공손한'], ['confident / confidential', '자신 있는 / 기밀의'], ['industrial / industrious', '산업의 / 근면한'], ['sensitive / sensible', '민감한 / 분별 있는'], ['dependable / dependent', '믿을 만한 / 의존적인'], ['timely', '시기적절한 (형용사)'], ['costly', '비싼 (형용사)'], ['experienced', '경험 많은'], ['detailed', '상세한'], ['complimentary', '무료의, 칭찬하는'], ['complementary', '보완하는']]
},
'p5-adv': {
  intro: '문장이 이미 완전한데 빈칸이 하나 더 있다면 거의 부사입니다. 고난도에서는 **위치보다 뜻**을 묻는 부사(hardly, shortly, otherwise)가 갈립니다.',
  rules: [
    { h: '완전한 문장 + 빈칸 = 부사', p: '주어, 동사, (목적어)가 다 있으면 남은 자리는 수식어. 동사 앞뒤, 문장 끝 모두 가능합니다.',
      ex: [['The technician carefully inspected each unit.', '기술자는 각 장치를 꼼꼼히 점검했다.'], ['Sales rose sharply in the third quarter.', '3분기에 매출이 급증했다.']] },
    { h: '조동사·have·be와 동사 사이', p: 'will ___ attend, has ___ completed, was ___ reviewed. 동사구 중간은 부사 자리입니다.',
      ex: [['The order has already been shipped.', '주문품은 이미 발송되었다.'], ['The report was thoroughly reviewed.', '보고서가 철저히 검토되었다.']] },
    { h: '형용사·부사·숫자 앞', p: '정도 부사(highly, extremely, relatively)는 형용사를, approximately·nearly·almost는 숫자를 꾸밉니다.',
      ex: [['a relatively small budget', '비교적 적은 예산'], ['Approximately 200 people attended.', '약 200명이 참석했다.']] },
    { h: '-ly 유무로 뜻이 바뀌는 부사', p: 'hard/hardly, late/lately, close/closely, high/highly, near/nearly. -ly가 붙으면 전혀 다른 뜻이 됩니다.',
      ex: [['We could hardly hear the speaker.', '연사 말이 거의 들리지 않았다.'], ['Monitor the results closely.', '결과를 면밀히 지켜보세요.']] },
    { h: '접속부사는 접속사가 아니다', p: 'however, therefore, otherwise, moreover, consequently는 부사라 두 절을 연결하지 못합니다. 앞에 세미콜론이나 마침표가 있어야 해요.',
      ex: [['Book early; otherwise, seats may sell out.', '일찍 예약하세요. 그렇지 않으면 매진될 수 있습니다.']] }
  ],
  listTitle: '뜻으로 묻는 빈출 부사',
  list: [['shortly', '곧 (shortly after: 직후)'], ['promptly', '신속히, 정각에'], ['formerly', '이전에'], ['previously', '이전에'], ['lately / recently', '최근에 (현재완료와 함께)'], ['hardly / barely / scarcely', '거의 ~않다'], ['nearly / almost', '거의'], ['approximately / roughly', '대략'], ['exclusively', '오로지, 독점적으로'], ['temporarily', '일시적으로'], ['consistently', '한결같이'], ['substantially', '상당히'], ['tentatively', '잠정적으로'], ['respectively', '각각'], ['accordingly', '그에 맞게'], ['otherwise', '그렇지 않으면, 달리'], ['still', '여전히 (부정문 앞)'], ['yet', '아직 (부정문 끝)']]
},
'p5-pron': {
  intro: '대명사는 **격**과 **가리키는 대상**을 함께 봅니다. 재귀대명사, 소유대명사, those who가 단골입니다.',
  rules: [
    { h: '격: 주격·소유격·목적격·소유대명사', p: '동사 앞은 주격, 명사 앞은 소유격, 동사·전치사 뒤는 목적격, 단독으로 "~의 것"이면 소유대명사.',
      ex: [['Ms. Ito presented her findings.', '이토 씨는 자신의 연구 결과를 발표했다.'], ['The idea was originally hers.', '그 아이디어는 원래 그녀의 것이었다.']] },
    { h: '재귀대명사 두 용법', p: '주어와 목적어가 같으면 재귀(목적어 자리 필수), 강조하면 문장 끝이나 주어 뒤(빼도 문장 성립). by oneself = 혼자, 직접.',
      ex: [['The manager reviewed the contracts herself.', '관리자가 직접 계약서를 검토했다.'], ['He introduced himself to the clients.', '그는 고객들에게 자기소개를 했다.']] },
    { h: '대상의 수·성 일치', p: '회사·부서·위원회는 it/its, 복수 명사는 they/their. 앞에 나온 명사 중 무엇을 가리키는지 먼저 찾으세요.',
      ex: [['The committee announced its decision.', '위원회가 결정을 발표했다.'], ['Employees must update their passwords.', '직원은 비밀번호를 갱신해야 한다.']] },
    { h: 'those who / anyone who', p: '"~하는 사람들"은 those who + 복수 동사. them who는 쓰지 않습니다. 앞 명사 반복은 that/those (of).',
      ex: [['Those who register early receive a discount.', '일찍 등록하는 사람은 할인을 받는다.'], ['This year\'s sales exceeded those of last year.', '올해 매출이 작년 매출을 넘었다.']] }
  ],
  listTitle: '부정대명사 핵심',
  list: [['one / another / the other', '하나 / 또 하나 / (둘 중) 나머지 하나'], ['others / the others', '다른 것들 / 나머지 전부'], ['each other / one another', '서로'], ['each of + 복수명사', '단수 동사'], ['either / neither', '둘 중 하나 / 둘 다 아님'], ['none of', '아무도 ~않다'], ['some / any', '긍정 / 부정·의문·조건'], ['on one\'s own', '혼자 힘으로'], ['by oneself', '혼자, 직접'], ['of one\'s own', '자기 소유의']]
},
'p5-agree': {
  intro: '수 일치는 **진짜 주어 찾기** 싸움입니다. 주어와 동사 사이에 끼어든 수식어를 걷어내는 연습이 핵심이에요.',
  rules: [
    { h: '수식어를 걷어내고 주어 찾기', p: '전치사구, 분사구, 관계절, 동격이 끼어 있어도 동사는 맨 앞 주어에 맞춥니다.',
      ex: [['The list of approved vendors is updated monthly.', '승인 업체 목록은 매달 갱신된다.'], ['The manuals included in the box explain the setup.', '상자에 든 설명서가 설치 방법을 설명한다.']] },
    { h: '수량 표현에 따른 수', p: 'each, every, either, neither, one of + 복수명사 → 단수. a number of → 복수, the number of → 단수.',
      ex: [['Each of the rooms has a balcony.', '방마다 발코니가 있다.'], ['A number of guests have complained.', '여러 손님이 불만을 제기했다.']] },
    { h: '부분 표현은 of 뒤 명사에 일치', p: 'most/some/all/half/the rest/분수 + of + 명사 → of 뒤 명사가 단수(불가산)면 단수, 복수면 복수.',
      ex: [['Most of the equipment is new.', '장비 대부분이 새것이다.'], ['Half of the participants were late.', '참가자 절반이 늦었다.']] },
    { h: '관계대명사 주격 뒤 동사', p: 'who/which/that 뒤 동사는 선행사에 맞춥니다. "one of the + 복수 + who"는 보통 복수.',
      ex: [['Customers who order online receive free shipping.', '온라인 주문 고객은 무료 배송을 받는다.']] },
    { h: '상관접속사의 수', p: 'A and B → 복수. either A or B, neither A nor B, not only A but also B → B에 일치. A as well as B → A에 일치.',
      ex: [['Neither the manager nor the assistants were informed.', '관리자도 보조 직원들도 통보받지 못했다.']] }
  ],
  listTitle: '단수 취급 주의',
  list: [['news', '뉴스 (단수)'], ['economics / statistics(학문)', '학문명 (단수)'], ['the number of', '~의 수 (단수)'], ['a number of', '많은 (복수)'], ['every / each + 명사', '단수'], ['동명사·to부정사 주어', '단수'], ['명사절 주어 (What we need ...)', '단수'], ['기간·금액·거리 (Five years is ...)', '한 덩어리면 단수'], ['the police / people', '복수'], ['staff (구성원 의미)', '보통 복수']]
},
'p5-tense': {
  intro: '시제 문제는 **시간 단서**가 정답을 정해 줍니다. 단서를 먼저 동그라미 치고 보기를 보세요.',
  rules: [
    { h: '과거 시점 단서 → 과거', p: 'yesterday, last ~, ~ ago, in 2023, when + 과거절은 과거 시제. 현재완료와 같이 쓰지 않습니다.',
      ex: [['The firm relocated its headquarters two years ago.', '그 회사는 2년 전 본사를 옮겼다.']] },
    { h: '기간·경험·완료 → 현재완료', p: 'for/since, over the past ~, so far, recently, already, yet은 현재완료와 어울립니다.',
      ex: [['Sales have increased steadily since March.', '3월 이후 매출이 꾸준히 늘었다.'], ['Over the past decade, the city has grown rapidly.', '지난 10년간 도시가 빠르게 성장했다.']] },
    { h: '시간·조건 부사절은 현재로 미래 표현', p: 'when, before, after, until, as soon as, once, if, unless가 이끄는 부사절은 미래 내용이라도 현재(완료) 시제.',
      ex: [['We will begin as soon as everyone arrives.', '모두 도착하는 대로 시작하겠다.'], ['Once the contract has been signed, work will start.', '계약서에 서명이 끝나면 작업을 시작한다.']] },
    { h: '과거보다 앞선 일 → 과거완료', p: 'by the time + 과거, before + 과거 등 과거 기준점보다 먼저 끝난 일.',
      ex: [['By the time the CEO arrived, the meeting had ended.', 'CEO가 도착했을 때는 회의가 이미 끝나 있었다.']] },
    { h: '미래 기준점까지 완료 → 미래완료', p: 'by + 미래 시점, by the time + 현재절 → will have p.p.',
      ex: [['By next June, we will have opened ten stores.', '내년 6월이면 매장을 열 개 열었을 것이다.']] }
  ],
  listTitle: '시제 단서 정리',
  list: [['ago, last, yesterday, in + 과거 연도', '과거'], ['since, for, over the past, so far', '현재완료'], ['already, yet, just, recently', '현재완료(또는 과거)'], ['by the time + 과거', '과거완료'], ['by + 미래, by the time + 현재', '미래완료'], ['next, tomorrow, upcoming', '미래'], ['usually, every, regularly', '현재'], ['currently, at the moment', '현재진행'], ['when + 현재절 (미래 의미)', '주절은 미래'], ['It has been ~ since', '~한 지 ~ 되었다']]
},
'p5-voice': {
  intro: '능동/수동은 **목적어가 있는지**와 **주어가 동작을 하는지 당하는지** 두 가지만 확인하면 됩니다.',
  rules: [
    { h: '타동사 뒤 목적어 없음 → 수동', p: '빈칸 뒤에 목적어(명사)가 없고 전치사나 마침표가 오면 수동태를 의심하세요.',
      ex: [['The package was delivered to the wrong address.', '소포가 잘못된 주소로 배달되었다.']] },
    { h: '목적어 있음 → 능동 (예외: 4·5형식)', p: '뒤에 목적어가 있으면 보통 능동. 단, give/offer/award/send(4형식)와 consider/name/elect(5형식)는 수동 뒤에도 명사가 남습니다.',
      ex: [['Ms. Park was awarded a bonus.', '박 씨는 보너스를 받았다.'], ['He was named employee of the year.', '그는 올해의 직원으로 선정되었다.']] },
    { h: '자동사는 수동이 없다', p: 'occur, happen, arise, rise, remain, expire, emerge, function은 수동태 불가.',
      ex: [['The problem occurred during the update.', '업데이트 중 문제가 발생했다. (was occurred ✕)'], ['The contract expires in May.', '계약은 5월에 만료된다.']] },
    { h: '수동태 + 전치사 숙어', p: 'be based on, be committed to, be equipped with, be entitled to, be involved in 등은 덩어리로 외우세요.',
      ex: [['All rooms are equipped with Wi-Fi.', '모든 객실에 와이파이가 있다.'], ['Members are entitled to a discount.', '회원은 할인을 받을 자격이 있다.']] },
    { h: '진행·완료 수동', p: 'is being p.p.(진행 중인 수동), has been p.p.(완료된 수동). 시제 단서와 함께 판단.',
      ex: [['The lobby is being renovated.', '로비가 보수 중이다.'], ['The issue has been resolved.', '문제가 해결되었다.']] }
  ],
  listTitle: '수동태 + 전치사 빈출',
  list: [['be based on', '~에 근거하다'], ['be committed to (-ing)', '~에 전념하다'], ['be dedicated to (-ing)', '~에 헌신하다'], ['be equipped with', '~을 갖추다'], ['be entitled to', '~할 자격이 있다'], ['be involved in', '~에 관여하다'], ['be exposed to', '~에 노출되다'], ['be accustomed to (-ing)', '~에 익숙하다'], ['be associated with', '~와 관련되다'], ['be divided into', '~로 나뉘다'], ['be required to do', '~해야 한다'], ['be expected to do', '~할 것으로 예상되다'], ['be scheduled to do / for', '~할 예정이다'], ['be eligible for', '~할 자격이 있다 (형용사)']]
},
'p5-mood': {
  intro: '가정법과 당위의 should 생략은 문제 수는 적어도 **나오면 거의 고난도**입니다. 공식처럼 외워 두면 빨리 풉니다.',
  rules: [
    { h: '요구·제안·주장 동사 + that + 동사원형', p: 'request, require, recommend, suggest, insist, ask, demand, propose 뒤 that절은 (should) 동사원형. 주어가 3인칭 단수여도 -s 없음.',
      ex: [['The manager requested that each employee submit a report.', '관리자는 직원마다 보고서를 제출하라고 요청했다.'], ['We recommend that the meeting be postponed.', '회의를 연기할 것을 권합니다.']] },
    { h: 'It is + 필수·중요 형용사 + that + 원형', p: 'essential, imperative, necessary, important, vital, crucial 뒤 that절도 동사원형.',
      ex: [['It is essential that all visitors sign in.', '방문객 전원이 서명하는 것이 꼭 필요하다.']] },
    { h: '가정법 과거 / 과거완료', p: '현재 사실 반대: If + 과거, would + 원형. 과거 사실 반대: If + had p.p., would have p.p.',
      ex: [['If we had more staff, we would open on Sundays.', '직원이 더 있다면 일요일에도 열 텐데.'], ['If the order had arrived on time, we would have met the deadline.', '주문품이 제때 왔다면 마감을 지켰을 것이다.']] },
    { h: 'If 생략 도치', p: 'Should + 주어 + 원형(혹시 ~하면), Had + 주어 + p.p., Were + 주어. 문두에 Should/Had가 보이면 도치 가정법입니다.',
      ex: [['Should you have any questions, please call us.', '문의 사항이 있으시면 전화 주세요.'], ['Had I known, I would have helped.', '알았더라면 도왔을 텐데.']] }
  ],
  listTitle: 'that절에 원형을 부르는 말',
  list: [['request / require / ask', '요청하다 / 요구하다'], ['recommend / suggest / advise', '권하다 / 제안하다'], ['insist / demand', '주장하다 / 요구하다'], ['propose / urge', '제안하다 / 촉구하다'], ['essential / imperative', '필수적인 / 꼭 해야 하는'], ['necessary / vital / crucial', '필요한 / 중요한'], ['important / advisable', '중요한 / 바람직한'], ['Should you need ~', '혹시 ~가 필요하면'], ['Had it not been for ~', '~이 없었더라면'], ['as if + 과거', '마치 ~인 것처럼']]
},
'p5-inf': {
  intro: 'to부정사는 **동사가 목적어로 무엇을 취하는가**와 **목적·의도의 의미**를 묻습니다.',
  rules: [
    { h: 'to부정사를 목적어로 취하는 동사', p: '앞으로 할 일을 나타내는 동사가 많습니다: plan, decide, agree, hope, expect, refuse, fail, offer, aim, intend.',
      ex: [['The company plans to hire twenty engineers.', '그 회사는 엔지니어 20명을 채용할 계획이다.'], ['He failed to meet the deadline.', '그는 마감을 지키지 못했다.']] },
    { h: '동사 + 목적어 + to do', p: 'ask, allow, enable, encourage, require, remind, invite, permit, advise + 목적어 + to부정사.',
      ex: [['The software enables users to track expenses.', '그 소프트웨어로 사용자는 경비를 관리할 수 있다.'], ['Staff are reminded to lock their desks.', '직원들은 책상을 잠그라는 안내를 받는다.']] },
    { h: '목적: (in order) to / so as to', p: '완전한 문장 뒤에 빈칸 + 동사원형이 오면 목적의 to부정사. 문두에도 올 수 있습니다.',
      ex: [['To qualify for the discount, order before Friday.', '할인을 받으려면 금요일 전에 주문하세요.'], ['We extended our hours in order to serve more customers.', '고객을 더 받으려고 영업시간을 늘렸다.']] },
    { h: '명사·형용사 + to do', p: 'ability, effort, plan, opportunity, decision + to do / be able, eager, likely, willing, reluctant + to do.',
      ex: [['in an effort to reduce costs', '비용을 줄이려는 노력의 일환으로'], ['Customers are likely to return.', '고객들이 다시 올 가능성이 높다.']] }
  ],
  listTitle: 'to부정사와 짝인 표현',
  list: [['be about to do', '막 ~하려 하다'], ['be eager to do', '몹시 ~하고 싶어하다'], ['be reluctant to do', '~하기를 꺼리다'], ['be eligible to do', '~할 자격이 있다'], ['be supposed to do', '~하기로 되어 있다'], ['in an effort to do', '~하려는 노력으로'], ['have yet to do', '아직 ~하지 않았다'], ['the first / last to do', '처음으로 / 마지막으로 ~한'], ['opportunity to do', '~할 기회'], ['strive to do', '~하려고 애쓰다'], ['hesitate to do', '~하기를 망설이다'], ['afford to do', '~할 여유가 있다']]
},
'p5-ger': {
  intro: '동명사는 **전치사 뒤**, **특정 동사 뒤**, 그리고 **to가 전치사인 표현** 세 곳이 출제 포인트입니다.',
  rules: [
    { h: '전치사 뒤 + 목적어 → 동명사', p: '전치사 뒤 빈칸 다음에 목적어(명사)가 이어지면 명사가 아니라 동명사를 고릅니다.',
      ex: [['Thank you for choosing our hotel.', '저희 호텔을 선택해 주셔서 감사합니다.'], ['Before submitting the form, check every field.', '양식을 제출하기 전에 모든 칸을 확인하세요.']] },
    { h: '동명사를 목적어로 취하는 동사', p: '이미 하고 있거나 피하는 일을 나타내는 동사: consider, avoid, suggest, recommend, finish, postpone, mind, deny, include.',
      ex: [['We are considering opening a branch in Busan.', '부산 지점 개설을 검토 중이다.'], ['Avoid placing the device near heat.', '기기를 열 가까이에 두지 마세요.']] },
    { h: 'to가 전치사인 표현', p: 'look forward to, be committed to, be dedicated to, contribute to, object to, in addition to 뒤에는 -ing.',
      ex: [['We look forward to working with you.', '함께 일하게 되길 기대합니다.'], ['The firm is committed to reducing waste.', '그 회사는 폐기물 감축에 힘쓰고 있다.']] },
    { h: '동명사 vs 명사', p: '뒤에 목적어가 있으면 동명사, 없으면 명사. 명사형이 따로 있는 경우(approval, arrangement)는 명사가 우선입니다.',
      ex: [['Upon receiving the payment, we will ship the order.', '대금을 받는 즉시 주문품을 발송한다.'], ['Upon receipt of payment, we will ship the order.', '대금 수령 즉시 발송한다.']] }
  ],
  listTitle: '동명사 빈출 표현',
  list: [['look forward to -ing', '~하기를 고대하다'], ['be committed to -ing', '~에 전념하다'], ['contribute to -ing', '~에 기여하다'], ['object to -ing', '~에 반대하다'], ['be used to -ing', '~에 익숙하다'], ['when it comes to -ing', '~에 관해서라면'], ['spend time (in) -ing', '~하는 데 시간을 쓰다'], ['have difficulty (in) -ing', '~하는 데 어려움을 겪다'], ['be worth -ing', '~할 가치가 있다'], ['upon / on -ing', '~하자마자'], ['consider / suggest -ing', '~을 고려하다 / 제안하다'], ['postpone / delay -ing', '~을 미루다']]
},
'p5-part': {
  intro: '분사는 **명사를 꾸미는 분사**와 **분사구문** 두 갈래입니다. 둘 다 결국 능동(-ing)인지 수동(-ed)인지를 묻습니다.',
  rules: [
    { h: '명사 수식: 하면 -ing, 당하면 -ed', p: '꾸밈받는 명사가 그 동작을 직접 하면 현재분사, 당하면 과거분사. 뒤에 목적어가 있으면 -ing 쪽입니다.',
      ex: [['Employees attending the seminar should register.', '세미나에 참석하는 직원은 등록해야 한다.'], ['The documents attached to this e-mail are confidential.', '이 이메일에 첨부된 문서는 기밀이다.']] },
    { h: '분사구문', p: '콤마 앞뒤로 주어 없는 구가 붙어 있으면 분사구문. 주절 주어가 그 동작을 하는지 당하는지로 판단합니다.',
      ex: [['Founded in 1998, the firm now employs 500 people.', '1998년에 설립된 그 회사는 현재 500명을 고용한다.'], ['Having reviewed the proposal, the board approved it.', '제안서를 검토한 뒤 이사회가 승인했다.']] },
    { h: '접속사 + 분사', p: 'when, while, before, after, once, unless, as + 분사. 접속사를 남겨 의미를 분명히 한 형태입니다.',
      ex: [['When completed, the bridge will be the longest in the region.', '완공되면 그 다리는 지역에서 가장 길다.'], ['Please read the manual before operating the machine.', '기계를 작동하기 전에 설명서를 읽으세요.']] },
    { h: 'with + 명사 + 분사', p: '"~가 ~한 채로". 명사와 분사의 관계(능동/수동)로 형태를 고릅니다.',
      ex: [['With prices rising, sales slowed.', '가격이 오르면서 판매가 둔화되었다.'], ['with all costs included', '모든 비용이 포함된 채로']] }
  ],
  listTitle: '토익 단골 분사 형용사',
  list: [['attached / enclosed', '첨부된 / 동봉된'], ['updated / revised', '갱신된 / 수정된'], ['proposed', '제안된'], ['designated', '지정된'], ['estimated', '추정된'], ['existing', '기존의'], ['leading', '선도하는'], ['remaining', '남아 있는'], ['rewarding', '보람 있는'], ['demanding', '까다로운'], ['outstanding', '뛰어난, 미지불의'], ['missing', '빠진, 분실된'], ['dedicated', '헌신적인, 전용의'], ['accomplished', '숙련된']]
},
'p5-prepconj': {
  intro: '같은 뜻의 전치사와 접속사가 보기에 함께 나오면 **빈칸 뒤가 명사(구)인지 절(주어+동사)인지**만 보면 됩니다.',
  rules: [
    { h: '뒤가 명사구 → 전치사, 절 → 접속사', p: '의미보다 구조를 먼저. 동사가 보이면 접속사, 없으면 전치사.',
      ex: [['Despite the rain, the event was held outdoors.', '비가 왔지만 행사는 야외에서 열렸다.'], ['Although it rained, the event was held outdoors.', '비가 왔지만 행사는 야외에서 열렸다.']] },
    { h: '같은 뜻끼리 짝지어 외우기', p: '양보, 이유, 시간, 조건마다 전치사와 접속사 짝이 있습니다. 아래 목록을 짝으로 기억하세요.',
      ex: [['Because of the delay, we missed the flight.', '지연 때문에 비행기를 놓쳤다.'], ['Because the train was delayed, we missed the flight.', '기차가 지연되어 비행기를 놓쳤다.']] },
    { h: '전치사·접속사 둘 다 되는 말', p: 'before, after, until, since는 둘 다 가능해서 구조로 걸러지지 않습니다. 이때는 뜻으로 고르세요.',
      ex: [['Since joining the firm, she has led three projects.', '입사 이후 그녀는 프로젝트 세 개를 이끌었다.']] },
    { h: '부사는 둘 다 안 된다', p: 'however, therefore, meanwhile, nevertheless는 부사라 명사도 절도 연결하지 못합니다. 보기에서 먼저 지우세요.',
      ex: [['The store was busy; nevertheless, service was fast.', '가게가 붐볐지만 서비스는 빨랐다.']] }
  ],
  listTitle: '전치사 ↔ 접속사 짝',
  list: [['despite / in spite of ↔ although / even though', '~에도 불구하고'], ['because of / due to / owing to ↔ because / since / as', '~ 때문에'], ['during ↔ while', '~ 동안'], ['in case of ↔ in case', '~의 경우에 대비해'], ['without ↔ unless', '~ 없이 / ~하지 않으면'], ['in addition to ↔ (접속사 없음)', '~에 더해'], ['except (for) ↔ except that', '~을 제외하고'], ['by ↔ by the time', '~까지'], ['regardless of ↔ no matter what', '~와 상관없이'], ['in the event of ↔ in the event that', '~할 경우'], ['upon ↔ as soon as', '~하자마자'], ['given ↔ given that', '~을 고려하면']]
},
'p5-conj': {
  intro: '접속사 문제는 구조가 맞는 보기 여러 개 중 **앞뒤 절의 논리 관계**에 맞는 하나를 고르는 문제입니다.',
  rules: [
    { h: '논리 관계부터 정하기', p: '앞 절과 뒤 절이 원인-결과인지, 대조인지, 조건인지, 시간 순서인지 먼저 정한 뒤 보기를 보세요.',
      ex: [['Unless you object, we will proceed with the plan.', '반대하지 않으시면 계획대로 진행하겠습니다.'], ['Now that the merger is complete, the teams will relocate.', '합병이 끝났으니 팀들이 이전한다.']] },
    { h: '조건 접속사 묶음', p: 'if, unless(~하지 않으면), provided/providing (that)(~라면), as long as(~하는 한), in case(~에 대비해), once(일단 ~하면).',
      ex: [['You may return the item provided that it is unused.', '사용하지 않았다면 반품할 수 있다.'], ['Bring an umbrella in case it rains.', '비가 올 경우에 대비해 우산을 챙기세요.']] },
    { h: '상관접속사', p: 'both A and B, either A or B, neither A nor B, not only A but also B, whether A or B. 짝이 맞는지 확인합니다.',
      ex: [['The course is available both online and in person.', '그 강좌는 온라인과 대면 모두 가능하다.'], ['Whether you drive or take the train, allow extra time.', '운전하든 기차를 타든 시간을 넉넉히 잡으세요.']] },
    { h: 'so that / so ~ that / such ~ that', p: 'so that + 주어 + can(목적), so + 형용사 + that(결과), such + (a) 형용사 + 명사 + that(결과).',
      ex: [['Arrive early so that you can find a seat.', '자리를 잡을 수 있게 일찍 오세요.'], ['The demand was so high that we sold out.', '수요가 너무 많아 매진되었다.']] }
  ],
  listTitle: '뜻으로 고르는 접속사',
  list: [['unless', '~하지 않으면'], ['provided (that) / providing', '~라면'], ['as long as', '~하는 한'], ['in case', '~할 경우에 대비해'], ['now that', '~이므로, 이제 ~이니'], ['once', '일단 ~하면'], ['whereas / while', '반면에'], ['even if', '설령 ~하더라도'], ['so that', '~하도록'], ['as soon as', '~하자마자'], ['until', '~할 때까지'], ['whether A or B', 'A이든 B이든'], ['not only A but (also) B', 'A뿐 아니라 B도'], ['given that', '~을 고려하면']]
},
'p5-rel': {
  intro: '관계사는 **선행사**와 **뒤 문장이 완전한지**로 결정합니다. 불완전하면 관계대명사, 완전하면 관계부사나 접속사.',
  rules: [
    { h: '불완전한 절 → 관계대명사', p: '빈칸 뒤에 주어나 목적어가 빠져 있으면 who/which/that. 사람이면 who, 사물이면 which.',
      ex: [['Candidates who meet the requirements will be contacted.', '자격 요건을 충족하는 후보에게 연락한다.'], ['The printer that we ordered arrived damaged.', '주문한 프린터가 파손된 채 왔다.']] },
    { h: '명사 + 명사 → whose', p: '빈칸 바로 뒤에 관사 없는 명사가 오고 그 뒤 절이 완전하면 소유격 whose.',
      ex: [['We met a supplier whose prices are lower.', '가격이 더 낮은 공급업체를 만났다.']] },
    { h: '완전한 절 → 관계부사 / 전치사 + which', p: '장소 where, 시간 when, 이유 why. 전치사 + which = 관계부사.',
      ex: [['the hotel where the conference will be held', '회의가 열릴 호텔'], ['the date on which the order was placed', '주문한 날짜']] },
    { h: 'that을 못 쓰는 자리', p: '콤마 뒤(계속적 용법), 전치사 뒤에는 that 불가.',
      ex: [['Mr. Cho, who joined in May, leads the team.', '5월에 입사한 조 씨가 팀을 이끈다.'], ['the people with whom I work', '나와 함께 일하는 사람들']] },
    { h: '수량 + of + whom/which', p: 'some/most/all/none/many of whom(사람), of which(사물). 콤마 뒤에서 두 절을 이어 줍니다.',
      ex: [['We received 300 applications, most of which were complete.', '지원서 300건을 받았고 대부분 빠짐없이 작성되었다.']] }
  ],
  listTitle: '관계사 판별 요약',
  list: [['who', '사람 + 주어 빠진 절'], ['whom', '사람 + 목적어 빠진 절 / 전치사 뒤'], ['which', '사물 + 불완전한 절 / 콤마·전치사 뒤 가능'], ['that', '사람·사물 + 불완전한 절 / 콤마·전치사 뒤 불가'], ['whose', '+ 명사 + 완전한 절'], ['what', '선행사 없음 + 불완전한 절 (~것)'], ['where', '장소 + 완전한 절'], ['when', '시간 + 완전한 절'], ['why', 'reason + 완전한 절'], ['whoever', '~하는 누구든'], ['whichever', '~하는 어느 것이든'], ['whatever', '~하는 무엇이든']]
},
'p5-nclause': {
  intro: '명사절은 문장 안에서 **주어·목적어·보어** 역할을 하는 절입니다. that, what, whether, 의문사가 경쟁합니다.',
  rules: [
    { h: 'that vs what', p: 'that 뒤는 완전한 절, what 뒤는 불완전한 절(주어나 목적어 빠짐). what = the thing(s) which.',
      ex: [['The survey showed that customers prefer online ordering.', '설문 결과 고객은 온라인 주문을 선호했다.'], ['What impressed the judges was her presentation.', '심사위원을 감동시킨 것은 그녀의 발표였다.']] },
    { h: 'whether / if (~인지 아닌지)', p: '불확실한 내용. 전치사 뒤, 주어 자리, to부정사 앞에는 whether만 가능합니다.',
      ex: [['We have not decided whether to renew the lease.', '임대를 갱신할지 아직 정하지 않았다.'], ['It depends on whether the client approves.', '고객이 승인하느냐에 달렸다.']] },
    { h: '의문사절은 평서문 어순', p: 'how, when, where, why, who가 명사절을 이끌면 "의문사 + 주어 + 동사".',
      ex: [['Please tell us when the shipment will arrive.', '배송이 언제 도착하는지 알려 주세요.'], ['The guide explains how the system works.', '안내서에 시스템 작동 방식이 나와 있다.']] },
    { h: '복합관계사 (-ever)', p: 'whoever(~하는 누구든), whatever(~하는 무엇이든). 명사절과 부사절 둘 다 가능.',
      ex: [['Whoever finishes first may leave early.', '먼저 끝내는 사람은 일찍 가도 된다.'], ['Choose whichever plan suits you.', '맞는 요금제를 아무거나 고르세요.']] }
  ],
  listTitle: '명사절 접속사 구분',
  list: [['that + 완전한 절', '~라는 것'], ['what + 불완전한 절', '~하는 것'], ['whether (or not)', '~인지 아닌지'], ['if', '~인지 (목적어 자리만)'], ['how + 형용사/부사', '얼마나 ~한지'], ['the fact that', '~라는 사실'], ['whoever', '~하는 사람은 누구든'], ['whatever', '~하는 것은 무엇이든'], ['whichever', '어느 것이든'], ['whether to do', '~할지 말지']]
},
'p5-comp': {
  intro: '비교 문제는 **단서 단어** 하나로 거의 결정됩니다. than, the, as, of all 같은 단서를 먼저 찾으세요.',
  rules: [
    { h: 'than → 비교급 / as ~ as → 원급', p: '빈칸 뒤 than이 보이면 비교급, 앞뒤에 as가 있으면 원급.',
      ex: [['This model is lighter than the previous one.', '이 모델은 이전 모델보다 가볍다.'], ['The new office is as spacious as the old one.', '새 사무실은 예전 사무실만큼 넓다.']] },
    { h: 'the + 최상급 + of/in/ever', p: '범위(of all, in the region)나 현재완료 경험(that I have ever seen)과 함께 최상급.',
      ex: [['It is the most efficient model on the market.', '시장에서 가장 효율적인 모델이다.'], ['the best results we have ever achieved', '지금까지 낸 최고의 결과']] },
    { h: '비교급 강조', p: 'much, even, far, still, a lot + 비교급. very는 비교급을 꾸밀 수 없습니다.',
      ex: [['Sales were much higher than expected.', '매출이 예상보다 훨씬 높았다.']] },
    { h: 'the 비교급, the 비교급', p: '"~할수록 더 ~하다". 앞뒤 모두 the + 비교급.',
      ex: [['The earlier you register, the lower the fee.', '일찍 등록할수록 비용이 낮다.']] },
    { h: '비교 대상 일치', p: '비교되는 두 대상은 같은 종류여야 해서 that of / those of로 받습니다.',
      ex: [['Our prices are lower than those of our competitors.', '우리 가격은 경쟁사 가격보다 낮다.']] }
  ],
  listTitle: '비교 관용 표현',
  list: [['no later than', '늦어도 ~까지'], ['no longer', '더 이상 ~않다'], ['more than / less than', '~이상 / ~미만'], ['as early as', '빠르면 ~에'], ['as soon as possible', '가능한 한 빨리'], ['twice as ~ as', '~의 두 배만큼'], ['one of the + 최상급 + 복수', '가장 ~한 것 중 하나'], ['at least / at most', '적어도 / 많아야'], ['rather than', '~보다는'], ['the second largest', '두 번째로 큰'], ['superior / inferior to', '~보다 우수한 / 열등한'], ['prior to', '~ 전에']]
},
'p5-quant': {
  intro: '수량 형용사는 **뒤 명사의 수**와 맞아야 합니다. 가산 단수, 가산 복수, 불가산 셋으로 나눠 외우세요.',
  rules: [
    { h: '가산 단수와 쓰는 말', p: 'each, every, another, either, neither, a/an + 단수 명사.',
      ex: [['Each participant will receive a certificate.', '참가자마다 수료증을 받는다.'], ['Another option is to work remotely.', '또 다른 선택지는 원격 근무다.']] },
    { h: '가산 복수와 쓰는 말', p: 'many, few, a few, several, numerous, a number of, various, both + 복수 명사.',
      ex: [['Several applicants withdrew.', '지원자 몇 명이 지원을 철회했다.'], ['Numerous studies support the claim.', '많은 연구가 그 주장을 뒷받침한다.']] },
    { h: '불가산과 쓰는 말', p: 'much, little, a little, a great deal of, an amount of + 불가산 명사.',
      ex: [['We received little feedback.', '피드백을 거의 받지 못했다.'], ['A great deal of effort went into the project.', '그 프로젝트에 많은 노력이 들었다.']] },
    { h: '둘 다 되는 말', p: 'all, most, some, any, a lot of, plenty of, more + 복수 또는 불가산. every는 숫자 + 복수와 함께 "~마다".',
      ex: [['Most equipment is under warranty.', '장비 대부분은 보증 기간이다.'], ['The bus runs every 15 minutes.', '버스는 15분마다 운행한다.']] }
  ],
  listTitle: '수량 표현 정리',
  list: [['each / every + 단수', '각각의 / 모든'], ['another + 단수', '또 하나의'], ['other + 복수', '다른'], ['few / a few + 복수', '거의 없는 / 몇몇'], ['little / a little + 불가산', '거의 없는 / 약간'], ['several / numerous + 복수', '몇몇 / 수많은'], ['a number of + 복수', '많은'], ['an amount of + 불가산', '양의'], ['a wide range of', '다양한'], ['the entire + 단수', '전체의'], ['every + 숫자 + 복수', '~마다'], ['each of the + 복수', '각각 (단수 동사)']]
},
'p5-prep': {
  intro: '전치사 문제는 **시간·장소의 기본 구분**과 **동사·명사·형용사와 짝을 이루는 전치사**로 나뉩니다.',
  rules: [
    { h: '시간 전치사', p: 'at(시각), on(날짜·요일), in(월·연도·기간 후). by(완료 기한) vs until(계속). for(기간 길이) vs during(특정 기간).',
      ex: [['Submit the form by Friday.', '금요일까지 양식을 제출하세요. (그때까지 완료)'], ['The office is closed until Monday.', '월요일까지 사무실이 문을 닫는다. (계속)']] },
    { h: '장소·범위 전치사', p: 'within(~이내), throughout(~ 전체에 걸쳐), among(셋 이상 사이), between(둘 사이), across(~ 전역에).',
      ex: [['Delivery is free within the city.', '시내 배송은 무료다.'], ['The firm has offices throughout Europe.', '그 회사는 유럽 전역에 사무소가 있다.']] },
    { h: '이유·양보·제외 전치사', p: 'due to, owing to, because of / despite, notwithstanding / except for, aside from, apart from.',
      ex: [['The flight was canceled due to fog.', '안개 때문에 항공편이 취소되었다.'], ['Aside from minor errors, the report is excellent.', '사소한 오류를 빼면 보고서는 훌륭하다.']] },
    { h: '짝 전치사', p: '명사·형용사·동사마다 붙는 전치사가 정해져 있습니다. 목록으로 외우는 수밖에 없어요.',
      ex: [['There has been an increase in demand.', '수요가 증가했다.'], ['The plan is subject to approval.', '그 계획은 승인을 받아야 한다.']] }
  ],
  listTitle: '짝으로 외우는 전치사',
  list: [['increase / decrease in', '~의 증가 / 감소'], ['demand for', '~에 대한 수요'], ['access to', '~에 대한 접근'], ['responsible for', '~을 책임지는'], ['subject to', '~의 대상인, ~을 조건으로'], ['in charge of', '~을 담당하는'], ['comply with', '~을 준수하다'], ['in accordance with', '~에 따라'], ['on behalf of', '~을 대신하여'], ['in response to', '~에 응하여'], ['regardless of', '~와 상관없이'], ['in light of', '~을 고려하여'], ['ahead of', '~보다 앞서'], ['prior to', '~ 이전에'], ['as of', '~부터, ~ 기준으로'], ['on account of', '~ 때문에']]
},
'p5-vn': {
  intro: '어휘 문제는 품사가 같은 네 보기 중 **뒤따르는 전치사·앞의 동사와의 궁합**으로 고릅니다. 뜻만 외우지 말고 덩어리로 외우세요.',
  rules: [
    { h: '명사 + 전치사 궁합', p: '빈칸 뒤 전치사가 단서입니다. 같은 뜻이라도 붙는 전치사가 다르면 오답이에요.',
      ex: [['We received an inquiry about the product.', '제품에 관한 문의를 받았다.'], ['There is a shortage of skilled workers.', '숙련 인력이 부족하다.']] },
    { h: '동사 + 명사 연어', p: 'meet a deadline, place an order, make a reservation, conduct a survey처럼 동사와 명사가 짝이 정해져 있습니다.',
      ex: [['We conducted a survey of 500 users.', '사용자 500명을 대상으로 설문을 했다.'], ['Please place your order online.', '온라인으로 주문해 주세요.']] }
  ],
  listTitle: '명사 어휘 빈출',
  list: [['inquiry about', '~에 관한 문의'], ['shortage of', '~의 부족'], ['priority', '우선 사항'], ['estimate', '견적'], ['invoice', '송장, 청구서'], ['reimbursement', '환급'], ['compensation', '보상'], ['warranty', '보증'], ['venue', '장소'], ['itinerary', '여행 일정'], ['inventory', '재고'], ['incentive', '장려책'], ['expertise', '전문 지식'], ['feasibility', '실현 가능성'], ['revenue', '수익'], ['deadline', '마감 기한'], ['capacity', '수용력, 역량'], ['consensus', '합의']]
},
'p5-vv': {
  intro: '동사 어휘는 **목적어와의 궁합**과 **구조(자동사/타동사, 뒤에 오는 전치사)**를 함께 봐야 합니다.',
  rules: [
    { h: '목적어 궁합', p: '빈칸 뒤 목적어가 무엇인지 보고 어울리는 동사를 고르세요. accommodate guests, address concerns, implement a policy.',
      ex: [['The hall can accommodate 300 guests.', '그 홀은 300명을 수용할 수 있다.'], ['We will address your concerns promptly.', '우려 사항을 신속히 처리하겠습니다.']] },
    { h: '구조 차이', p: 'respond to / reply to (자동사), discuss / approach / attend (타동사, 전치사 없음), inform A of B, remind A of B.',
      ex: [['Please inform us of any changes.', '변경 사항이 있으면 알려 주세요.'], ['We discussed the proposal.', '제안서를 논의했다. (discussed about ✕)']] }
  ],
  listTitle: '동사 어휘 빈출',
  list: [['accommodate', '수용하다, 맞추다'], ['address', '(문제를) 다루다'], ['implement', '시행하다'], ['streamline', '간소화하다'], ['expedite', '신속히 처리하다'], ['allocate', '할당하다'], ['acquire', '인수하다, 얻다'], ['assume', '(책임을) 맡다'], ['commence', '시작하다'], ['comply with', '준수하다'], ['adhere to', '고수하다'], ['enforce', '시행하다'], ['endorse', '지지하다'], ['oversee', '감독하다'], ['reimburse', '환급하다'], ['retain', '보유하다'], ['solicit', '요청하다'], ['undergo', '겪다, 받다']]
},
'p5-vadj': {
  intro: '형용사 어휘는 **꾸미는 명사**나 **뒤에 오는 전치사**와의 궁합이 결정적입니다.',
  rules: [
    { h: '형용사 + 명사 연어', p: 'competitive salary, extensive experience, tentative schedule. 명사와 같이 외우세요.',
      ex: [['The position offers a competitive salary.', '그 자리는 경쟁력 있는 급여를 제공한다.'], ['Applicants should have extensive experience.', '지원자는 폭넓은 경험이 있어야 한다.']] },
    { h: '형용사 + 전치사', p: 'eligible for, responsible for, aware of, capable of, compatible with, subject to.',
      ex: [['The software is compatible with most devices.', '그 소프트웨어는 대부분의 기기와 호환된다.']] }
  ],
  listTitle: '형용사 어휘 빈출',
  list: [['competitive', '경쟁력 있는'], ['extensive', '폭넓은'], ['tentative', '잠정적인'], ['mandatory', '의무적인'], ['optional', '선택적인'], ['prominent', '저명한, 눈에 띄는'], ['substantial', '상당한'], ['adequate', '적절한, 충분한'], ['eligible for', '~할 자격이 있는'], ['compatible with', '~와 호환되는'], ['capable of', '~할 수 있는'], ['subject to', '~의 대상인'], ['accessible', '접근 가능한'], ['affordable', '저렴한'], ['durable', '내구성 있는'], ['upcoming', '다가오는'], ['vacant', '비어 있는'], ['punctual', '시간을 지키는']]
},
'p5-vadv': {
  intro: '부사 어휘는 **동사·형용사와의 궁합**과 **시제와의 궁합**이 단서입니다. already/yet/still, recently/soon 같은 시간 부사는 시제와 맞춰 보세요.',
  rules: [
    { h: '시제와 맞는 부사', p: 'recently·lately → 현재완료/과거, soon·shortly → 미래, currently → 현재(진행), previously·formerly → 과거.',
      ex: [['The office recently moved downtown.', '사무실이 최근 시내로 옮겼다.'], ['The results will be announced shortly.', '결과는 곧 발표된다.']] },
    { h: '동사·형용사와의 궁합', p: 'highly recommended, closely monitored, readily available, strictly prohibited 같은 고정 짝.',
      ex: [['Smoking is strictly prohibited.', '흡연은 엄격히 금지된다.'], ['Parts are readily available.', '부품을 쉽게 구할 수 있다.']] }
  ],
  listTitle: '부사 연어 빈출',
  list: [['highly recommended', '적극 추천되는'], ['closely monitored', '면밀히 관찰되는'], ['readily available', '쉽게 구할 수 있는'], ['strictly prohibited', '엄격히 금지된'], ['newly renovated', '새로 보수된'], ['fully booked', '예약이 꽉 찬'], ['widely recognized', '널리 인정받는'], ['conveniently located', '편리한 곳에 있는'], ['tentatively scheduled', '잠정 예정된'], ['temporarily closed', '일시 폐쇄된'], ['sharply / steadily', '급격히 / 꾸준히'], ['promptly', '신속히, 정각에'], ['regularly', '정기적으로'], ['exclusively', '독점적으로'], ['previously', '이전에'], ['accordingly', '그에 맞춰']]
}
};
