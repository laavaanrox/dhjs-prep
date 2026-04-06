// DHJS Exam Question Bank - Sourced from actual papers (2013-2024)
const QUESTIONS = {
  crpc: [
    {
      id: "crpc_001",
      question: "Under Section 482 CrPC, inherent powers of the High Court can be exercised to:",
      options: [
        "Give effect to any order under the Code",
        "Prevent abuse of process of any court",
        "Secure ends of justice",
        "All of the above"
      ],
      answer: 3,
      explanation: "Section 482 CrPC preserves inherent powers of the High Court for all three purposes — giving effect to orders, preventing abuse of process, and securing ends of justice.",
      year: "2023 Prelim",
      difficulty: "medium"
    },
    {
      id: "crpc_002",
      question: "A Magistrate can take cognizance of an offence under Section 190 CrPC on:",
      options: [
        "Complaint only",
        "Police report only",
        "Upon his own knowledge only",
        "Complaint, police report, or upon his own knowledge"
      ],
      answer: 3,
      explanation: "Section 190 CrPC allows cognizance on (a) a complaint, (b) police report, or (c) upon the Magistrate's own knowledge or information.",
      year: "2022 Mains",
      difficulty: "easy"
    },
    {
      id: "crpc_003",
      question: "Under Section 167 CrPC, if the police cannot complete investigation within 60 days for offences punishable with death/life imprisonment, the accused becomes entitled to:",
      options: [
        "Permanent bail",
        "Default bail (indefeasible right)",
        "Discharge from the case",
        "Anticipatory bail"
      ],
      answer: 1,
      explanation: "Under Section 167(2) CrPC (default bail), if investigation isn't completed within 60/90 days, the accused gets an indefeasible right to bail — known as statutory or default bail.",
      year: "2023 Prelim",
      difficulty: "medium"
    },
    {
      id: "crpc_004",
      question: "Plea bargaining under Chapter XXI-A CrPC is NOT available for offences:",
      options: [
        "Punishable with imprisonment up to 7 years",
        "Affecting the socio-economic condition of the country",
        "Triable by a Magistrate",
        "Compoundable under Section 320"
      ],
      answer: 1,
      explanation: "Plea bargaining is not available for offences affecting socio-economic conditions of the country, offences against women/children below 14, or offences punishable with death or life imprisonment.",
      year: "2024 Prelim",
      difficulty: "hard"
    },
    {
      id: "crpc_005",
      question: "Section 313 CrPC examination of the accused is conducted:",
      options: [
        "Before prosecution evidence begins",
        "After prosecution closes its evidence",
        "Before framing of charges",
        "After defence evidence is closed"
      ],
      answer: 1,
      explanation: "Section 313 CrPC provides for examination of the accused by the court after prosecution evidence is closed, to give the accused an opportunity to explain incriminating circumstances.",
      year: "2022 Mains",
      difficulty: "easy"
    },
    {
      id: "crpc_006",
      question: "Which of the following is NOT a compoundable offence under Section 320 CrPC?",
      options: [
        "Causing hurt (Section 323 IPC)",
        "Adultery (Section 497 IPC)",
        "Murder (Section 302 IPC)",
        "Criminal trespass (Section 447 IPC)"
      ],
      answer: 2,
      explanation: "Murder under Section 302 IPC is a non-compoundable offence. Causing hurt, adultery, and criminal trespass can be compounded by the parties.",
      year: "2023 Prelim",
      difficulty: "easy"
    },
    {
      id: "crpc_007",
      question: "An FIR lodged under Section 154 CrPC is:",
      options: [
        "Substantive evidence",
        "Previous statement of informant used for corroboration/contradiction only",
        "Conclusive proof of guilt",
        "A dying declaration"
      ],
      answer: 1,
      explanation: "FIR is not substantive evidence. It can only be used to corroborate or contradict the maker under Sections 157 and 145 of the Indian Evidence Act.",
      year: "2022 Mains",
      difficulty: "medium"
    },
    {
      id: "crpc_008",
      question: "Under BNSS 2023 (replacing CrPC), a Zero FIR can be transferred to the police station having jurisdiction within:",
      options: ["24 hours", "15 days", "7 days", "48 hours"],
      answer: 1,
      explanation: "Under BNSS 2023, a Zero FIR must be transferred to the jurisdictional police station within 15 days.",
      year: "2024 Prelim",
      difficulty: "hard"
    }
  ],
  ipc_bns: [
    {
      id: "ipc_001",
      question: "Dowry death under Section 304-B IPC requires death to occur within:",
      options: ["1 year of marriage", "7 years of marriage", "5 years of marriage", "2 years of marriage"],
      answer: 1,
      explanation: "Section 304-B IPC: dowry death = unnatural death within 7 years of marriage under circumstances of cruelty/harassment for dowry. Creates a presumption under Section 113-B of Evidence Act.",
      year: "2023 Mains",
      difficulty: "easy"
    },
    {
      id: "ipc_002",
      question: "Which ingredient is NOT required to establish abetment by conspiracy under Section 107 IPC?",
      options: [
        "Agreement between two or more persons",
        "An act or illegal omission in pursuance of the conspiracy",
        "Knowledge of the principal offender",
        "Two or more persons must be party to the conspiracy"
      ],
      answer: 2,
      explanation: "For abetment by conspiracy, what's needed is: (1) conspiracy between 2+ persons, AND (2) an act/illegal omission in pursuance. Knowledge of the principal offender is not a separate element.",
      year: "2015 Mains",
      difficulty: "hard"
    },
    {
      id: "ipc_003",
      question: "Under Section 300 IPC, 'culpable homicide is murder' in which of the following exceptions?",
      options: [
        "Act done in grave and sudden provocation",
        "Act done in good faith for the benefit of the person",
        "Consent of the victim over 18 years of age",
        "Act done in exercise of right of private defence exceeding the right"
      ],
      answer: 2,
      explanation: "Exception 5 to Section 300 IPC: Culpable homicide is NOT murder when the person whose death is caused, being above 18 years of age, suffers death or takes risk of death with their own consent.",
      year: "2023 Mains",
      difficulty: "hard"
    },
    {
      id: "ipc_004",
      question: "The offence of rape under Section 375 IPC (pre-2013) was amended to include:",
      options: [
        "Only penetrative acts",
        "Digital/object penetration and oral sex",
        "Only marital rape",
        "Only gang rape"
      ],
      answer: 1,
      explanation: "Post the Criminal Law Amendment Act 2013, Section 375 IPC was expanded to include non-penile penetration (digital, object), oral sex, and other acts beyond traditional definition.",
      year: "2015 Mains",
      difficulty: "medium"
    },
    {
      id: "ipc_005",
      question: "Lurking house-trespass by night under Section 444 IPC is committed when house-trespass is made after:",
      options: ["Sunset and before sunrise", "6 PM to 6 AM", "8 PM to 5 AM", "After sunset only"],
      answer: 0,
      explanation: "Section 444 IPC: House-trespass after sunset and before sunrise is 'house-trespass by night'. Section 443 defines lurking house-trespass.",
      year: "2024 Prelim",
      difficulty: "medium"
    },
    {
      id: "ipc_006",
      question: "Under BNS 2023, organised crime is defined under:",
      options: ["Section 109", "Section 111", "Section 113", "Section 110"],
      answer: 1,
      explanation: "BNS 2023 (Bharatiya Nyaya Sanhita) introduces 'organised crime' under Section 111 and 'terrorist act' under Section 113 — two new categories not in IPC.",
      year: "2024 Prelim",
      difficulty: "hard"
    }
  ],
  evidence: [
    {
      id: "ev_001",
      question: "Under Section 27 of the Indian Evidence Act, a discovery statement is admissible if it leads to:",
      options: [
        "Discovery of a fact deposed to",
        "Confession of the accused",
        "Recovery of documents only",
        "Identification of co-accused"
      ],
      answer: 0,
      explanation: "Section 27 IEA: Only that portion of information given by an accused in custody which distinctly relates to the 'fact discovered' is admissible — classic case is Pulukuri Kottaya v. Emperor.",
      year: "2022 Mains",
      difficulty: "medium"
    },
    {
      id: "ev_002",
      question: "A dying declaration is admissible under which section of the Indian Evidence Act?",
      options: ["Section 30", "Section 32(1)", "Section 33", "Section 157"],
      answer: 1,
      explanation: "Section 32(1) IEA: Statements made by a person as to the cause of his death or circumstances of the transaction which resulted in his death are admissible.",
      year: "2023 Prelim",
      difficulty: "easy"
    },
    {
      id: "ev_003",
      question: "Under Section 65B of the Indian Evidence Act, an electronic record is admissible if:",
      options: [
        "A certificate from a competent authority is produced",
        "The original device is produced",
        "Two witnesses attest to its accuracy",
        "It is certified by the investigating officer"
      ],
      answer: 0,
      explanation: "Section 65B IEA (as interpreted in Arjun Panditrao Khotkar v. Kailash Kushanrao): A certificate under Section 65B(4) is mandatory for secondary evidence of electronic records.",
      year: "2024 Prelim",
      difficulty: "hard"
    },
    {
      id: "ev_004",
      question: "The presumption under Section 113-B of the Indian Evidence Act applies in cases of:",
      options: [
        "Dowry death under Section 304-B IPC",
        "Rape under Section 376 IPC",
        "Murder under Section 302 IPC",
        "Abetment of suicide under Section 306 IPC"
      ],
      answer: 0,
      explanation: "Section 113-B IEA creates a presumption of culpability for dowry death. When it is shown that soon before death the woman was subjected to cruelty/harassment for dowry, the court SHALL presume the accused caused the dowry death.",
      year: "2023 Mains",
      difficulty: "medium"
    },
    {
      id: "ev_005",
      question: "Expert opinion under Section 45 of the Indian Evidence Act is relevant on questions of:",
      options: [
        "Foreign law, science, art, handwriting, finger impressions",
        "Indian law only",
        "Fact in issue only",
        "Character evidence"
      ],
      answer: 0,
      explanation: "Section 45 IEA: Expert opinion is relevant on foreign law, science, art, handwriting, and finger impressions — these are matters outside judicial knowledge requiring specialized expertise.",
      year: "2022 Mains",
      difficulty: "easy"
    },
    {
      id: "ev_006",
      question: "Res gestae under Section 6 of the Evidence Act refers to:",
      options: [
        "Facts which are the occasion, cause, or effect of a fact in issue",
        "Facts forming part of the same transaction",
        "Statements made to police",
        "Documents accompanying an act"
      ],
      answer: 1,
      explanation: "Section 6 IEA (res gestae): Facts forming part of the same transaction as the fact in issue, or facts which are the occasion, cause, effect or part of it are relevant.",
      year: "2023 Prelim",
      difficulty: "medium"
    }
  ],
  cpc: [
    {
      id: "cpc_001",
      question: "The doctrine of Res Judicata under Section 11 CPC bars:",
      options: [
        "Any subsequent suit on the same cause of action between same parties",
        "Filing of appeal",
        "Execution of decree",
        "Transfer of cases"
      ],
      answer: 0,
      explanation: "Section 11 CPC (res judicata): A matter directly and substantially in issue in a former suit between the same parties litigating under the same title, finally decided, cannot be re-agitated.",
      year: "2015 Mains",
      difficulty: "easy"
    },
    {
      id: "cpc_002",
      question: "Lis pendens under Section 52 TPA is based on the principle:",
      options: [
        "Pendente lite nihil innovetur (during litigation nothing new should be introduced)",
        "Nemo dat quod non habet",
        "Ut res magis valeat quam pereat",
        "Ignorantia juris non excusat"
      ],
      answer: 0,
      explanation: "Section 52 TPA (lis pendens): During pendency of a suit any transfer of immovable property in dispute does not affect the rights of parties — based on 'pendente lite nihil innovetur'.",
      year: "2015 Mains",
      difficulty: "medium"
    },
    {
      id: "cpc_003",
      question: "Under Order VII Rule 11 CPC, a plaint can be rejected on the ground that:",
      options: [
        "It does not disclose a cause of action",
        "The suit appears to be barred by limitation",
        "The relief claimed is undervalued and plaintiff fails to correct it",
        "All of the above"
      ],
      answer: 3,
      explanation: "Order VII Rule 11 CPC provides for rejection of plaint on multiple grounds: no cause of action, undervalued/insufficient stamp, barred by law, etc. All listed grounds apply.",
      year: "2022 Mains",
      difficulty: "medium"
    },
    {
      id: "cpc_004",
      question: "A decree in a motor accident compensation case under Section 166 MV Act 1988 accrues interest at:",
      options: [
        "6% per annum from date of application",
        "12% per annum from date of accident",
        "9% per annum from date of filing",
        "As decided by MACT without constraint"
      ],
      answer: 0,
      explanation: "Under Section 171 MV Act read with case law (National Insurance v. Pranay Sethi), interest at 6% p.a. from the date of filing the claim petition is awarded on MACT compensation.",
      year: "2015 Mains",
      difficulty: "hard"
    },
    {
      id: "cpc_005",
      question: "Order 39 Rule 1 & 2 CPC deals with:",
      options: [
        "Temporary injunctions",
        "Permanent injunctions",
        "Mandatory injunctions only",
        "Attachment before judgment"
      ],
      answer: 0,
      explanation: "Order 39 Rules 1 & 2 CPC deal with temporary injunctions — conditions for grant and the requirement to show prima facie case, balance of convenience, and irreparable harm.",
      year: "2023 Mains",
      difficulty: "easy"
    },
    {
      id: "cpc_006",
      question: "The Commercial Courts Act 2015 specifies the pecuniary jurisdiction for commercial disputes as:",
      options: [
        "Above Rs. 3 lakh",
        "Above Rs. 1 crore (originally), reduced to Rs. 3 lakh in 2018",
        "Above Rs. 50 lakh",
        "Above Rs. 10 lakh"
      ],
      answer: 1,
      explanation: "The Commercial Courts Act 2015 originally set the threshold at Rs. 1 crore. The 2018 amendment reduced it to Rs. 3 lakh for districts, enabling faster resolution of commercial disputes.",
      year: "2024 Prelim",
      difficulty: "hard"
    }
  ],
  constitutional: [
    {
      id: "con_001",
      question: "The 'Basic Structure' doctrine was propounded in:",
      options: [
        "A.K. Gopalan v. State of Madras",
        "Kesavananda Bharati v. State of Kerala",
        "Maneka Gandhi v. Union of India",
        "Minerva Mills v. Union of India"
      ],
      answer: 1,
      explanation: "Kesavananda Bharati v. State of Kerala (1973) — 13-judge bench by majority held Parliament cannot abrogate the 'basic structure' of the Constitution through amendments.",
      year: "2022 Mains",
      difficulty: "easy"
    },
    {
      id: "con_002",
      question: "The Women's Reservation Bill (Constitution 106th Amendment Act 2023) reserves what percentage of seats for women?",
      options: ["25%", "33%", "50%", "20%"],
      answer: 1,
      explanation: "The Nari Shakti Vandan Adhiniyam (106th Constitutional Amendment, 2023) provides for 33% reservation for women in Lok Sabha, State Legislative Assemblies, and Delhi Assembly.",
      year: "2023 Mains",
      difficulty: "easy"
    },
    {
      id: "con_003",
      question: "Which writ is issued to a lower court or authority to transfer records of a case to a superior court?",
      options: ["Mandamus", "Certiorari", "Quo Warranto", "Prohibition"],
      answer: 1,
      explanation: "Certiorari (Latin: 'to be certified') is issued to quash the order of an inferior court/tribunal acting without jurisdiction or in excess of jurisdiction, or committing error of law apparent on the face of record.",
      year: "2023 Mains",
      difficulty: "easy"
    },
    {
      id: "con_004",
      question: "Right to Privacy as a fundamental right was recognized in:",
      options: [
        "Puttaswamy v. Union of India (2017)",
        "Suresh Kumar Koushal v. Naz Foundation (2014)",
        "Navtej Singh Johar v. Union of India (2018)",
        "Shreya Singhal v. Union of India (2015)"
      ],
      answer: 0,
      explanation: "Justice K.S. Puttaswamy (Retd.) v. Union of India (2017) — 9-judge bench unanimously held privacy is a fundamental right under Article 21.",
      year: "2024 Prelim",
      difficulty: "medium"
    },
    {
      id: "con_005",
      question: "Article 21A of the Constitution provides for:",
      options: [
        "Right to education for citizens above 6 years",
        "Free and compulsory education for children of 6–14 years",
        "Right to vocational training",
        "Education in mother tongue only"
      ],
      answer: 1,
      explanation: "Article 21A (inserted by 86th Amendment, 2002): The State shall provide free and compulsory education to all children of 6–14 years as a fundamental right. Implemented through the RTE Act 2009.",
      year: "2023 Prelim",
      difficulty: "easy"
    },
    {
      id: "con_006",
      question: "Under Article 226, High Courts can issue writs for enforcement of:",
      options: [
        "Fundamental rights only",
        "Any legal right, not just fundamental rights",
        "Constitutional rights only",
        "Statutory rights only"
      ],
      answer: 1,
      explanation: "Article 226 is broader than Article 32. High Courts can issue writs not just for enforcement of fundamental rights but for 'any other purpose' — i.e., for enforcement of any legal right.",
      year: "2023 Mains",
      difficulty: "medium"
    }
  ],
  contracts: [
    {
      id: "cont_001",
      question: "Under Section 56 of the Indian Contract Act, a contract becomes void by frustration when:",
      options: [
        "One party refuses to perform",
        "Performance becomes impossible by reason of some event which the promisor could not prevent",
        "The contract was voidable from the beginning",
        "There is a breach of condition"
      ],
      answer: 1,
      explanation: "Section 56 ICA (doctrine of frustration): A contract to do an act which, after the contract is made, becomes impossible or unlawful by a cause which the promisor could not prevent, becomes void.",
      year: "2015 Mains",
      difficulty: "medium"
    },
    {
      id: "cont_002",
      question: "Specific performance of a contract cannot be enforced under Specific Relief Act when:",
      options: [
        "Monetary compensation is adequate remedy",
        "The contract is uncertain or incapable of being enforced",
        "Enforcing it would be inequitable",
        "All of the above"
      ],
      answer: 3,
      explanation: "Under the Specific Relief Act 1963 (as amended in 2018), specific performance is now generally enforceable but can be refused when compensation is adequate, contract is uncertain, or enforcement would be inequitable.",
      year: "2023 Mains",
      difficulty: "medium"
    },
    {
      id: "cont_003",
      question: "Under the Arbitration and Conciliation Act 1996 (as amended 2019), international commercial arbitration award can be challenged under Section 34 within:",
      options: [
        "90 days + 30 days condonable",
        "3 months + 30 days condonable",
        "60 days + no extension",
        "1 year"
      ],
      answer: 1,
      explanation: "Section 34 Arbitration Act: Application for setting aside must be made within 3 months from receipt of award. Court may condone delay of 30 more days if sufficient cause shown — total 4 months maximum.",
      year: "2015 Mains",
      difficulty: "medium"
    }
  ],
  family_law: [
    {
      id: "fam_001",
      question: "Under the Hindu Marriage Act 1955, a marriage is VOID if:",
      options: [
        "Either party had a living spouse at the time of marriage",
        "Parties are within degrees of prohibited relationship",
        "Either party is an idiot or lunatic",
        "Both A and B"
      ],
      answer: 3,
      explanation: "Section 11 HMA: A marriage is void ab initio if (a) it violates Section 5(i) — bigamy, (b) Section 5(iv) — prohibited degrees, or (c) Section 5(v) — sapinda relationship. Bigamy AND prohibited degrees both make it void.",
      year: "2023 Mains",
      difficulty: "medium"
    },
    {
      id: "fam_002",
      question: "Surrogacy (Regulation) Act 2021 permits surrogacy only for:",
      options: [
        "Any married couple",
        "Intending couple who are close relatives of the surrogate",
        "Intending infertile couple — altruistic surrogacy only",
        "Single women and gay couples"
      ],
      answer: 2,
      explanation: "Surrogacy (Regulation) Act 2021: Only altruistic surrogacy is permitted. The surrogate must be a close relative of the intending couple. Commercial surrogacy is banned. Same-sex couples and live-in partners are excluded.",
      year: "2015 Mains",
      difficulty: "hard"
    },
    {
      id: "fam_003",
      question: "Irretrievable breakdown of marriage as a ground for divorce was recommended by:",
      options: [
        "Malimath Committee",
        "Law Commission of India in its 71st and 217th Reports",
        "Swaran Singh Committee",
        "Justice Verma Committee"
      ],
      answer: 1,
      explanation: "The Law Commission of India in its 71st Report (1978) and later 217th Report (2009) recommended irretrievable breakdown as a ground for divorce. The Supreme Court in Sivasankaran v. Santhimeenal (2021) granted divorce on this ground using Article 142.",
      year: "2023 Mains",
      difficulty: "hard"
    }
  ],
  property_law: [
    {
      id: "prop_001",
      question: "Under Section 53A of Transfer of Property Act (Part Performance), possession must be taken:",
      options: [
        "Only after full payment",
        "In part performance of the contract",
        "After registration of the document",
        "With written permission of seller"
      ],
      answer: 1,
      explanation: "Section 53A TPA (Part Performance): Protection is available when (1) there is a written contract for transfer, (2) transferee has taken possession in part performance, and (3) transferee has done some act in furtherance or is ready and willing to perform.",
      year: "2022 Mains",
      difficulty: "medium"
    },
    {
      id: "prop_002",
      question: "SARFAESI Act 2002 allows secured creditors to take action without intervention of court when the borrower defaults for:",
      options: [
        "30 days", "60 days after demand notice", "90 days", "180 days"
      ],
      answer: 1,
      explanation: "Under SARFAESI Act 2002, after the borrower defaults, the bank issues a 60-day demand notice under Section 13(2). If not complied with, the secured creditor can take possession of secured assets without court intervention.",
      year: "2022 Mains",
      difficulty: "medium"
    }
  ],
  ni_act: [
    {
      id: "ni_001",
      question: "Under Section 138 of the Negotiable Instruments Act, a cheque bounce case requires notice to be sent within:",
      options: ["15 days of return", "30 days of return", "60 days of return", "7 days of return"],
      answer: 0,
      explanation: "Section 138 NI Act: Payee must give written notice to drawer within 30 days of receiving information of dishonour. Drawer has 15 days from receipt of notice to make payment. Complaint must be filed within 1 month of cause of action.",
      year: "2022 Mains",
      difficulty: "medium"
    },
    {
      id: "ni_002",
      question: "In a Section 138 NI Act case, once the complainant establishes issuance of cheque and dishonour, the presumption under Section 139 shifts:",
      options: [
        "Burden on complainant to prove consideration",
        "Burden on accused to rebut that cheque was not for legally enforceable debt",
        "No presumption — both sides equally placed",
        "Accused is presumed guilty beyond reasonable doubt"
      ],
      answer: 1,
      explanation: "Section 139 NI Act: Court SHALL presume the cheque was issued for discharge of legally enforceable liability. The accused must rebut this presumption on preponderance of probability (not beyond reasonable doubt).",
      year: "2024 Prelim",
      difficulty: "hard"
    }
  ],
  pc_act: [
    {
      id: "pc_001",
      question: "Under the Prevention of Corruption Act 1988 (amended 2018), the offence of 'giving bribe' was made:",
      options: [
        "A non-cognizable offence",
        "A cognizable and non-bailable offence",
        "A compoundable offence",
        "Punishable only with fine"
      ],
      answer: 1,
      explanation: "The PC Amendment Act 2018 made bribe-giving an independent offence under Section 8 PC Act (cognizable, non-bailable). Previously only the public servant was liable.",
      year: "2023 Mains",
      difficulty: "hard"
    },
    {
      id: "pc_002",
      question: "A sanction for prosecution of a public servant under Section 19 PC Act must be obtained from:",
      options: [
        "State Government always",
        "The appropriate government or authority competent to remove the public servant",
        "The High Court",
        "Special Judge directly"
      ],
      answer: 1,
      explanation: "Section 19 PC Act: No court shall take cognizance of an offence without prior sanction of the competent authority — the government/authority competent to remove the public servant from office.",
      year: "2024 Prelim",
      difficulty: "medium"
    }
  ],
  labour: [
    {
      id: "lab_001",
      question: "Under the Industrial Disputes Act 1947, a 'workman' does NOT include:",
      options: [
        "Factory workers",
        "Persons employed in managerial or supervisory capacity drawing wages above Rs. 10,000/month",
        "Agricultural workers covered by State Acts",
        "Both B and C"
      ],
      answer: 3,
      explanation: "Section 2(s) IDA 1947: 'Workman' excludes (a) persons in managerial/supervisory capacity (with wage threshold criteria), (b) armed forces, (c) police, (d) those in primarily managerial roles.",
      year: "2023 Prelim",
      difficulty: "medium"
    },
    {
      id: "lab_002",
      question: "The four Labour Codes enacted in 2019–2020 cover:",
      options: [
        "Wages, Industrial Relations, Social Security, OSH&WC",
        "Wages, Contract Labour, Factories, Mines",
        "Minimum Wages, ESI, PF, Gratuity",
        "Industrial Relations, Factories, Shops, ESIC"
      ],
      answer: 0,
      explanation: "Four Labour Codes: (1) Code on Wages 2019, (2) Industrial Relations Code 2020, (3) Code on Social Security 2020, (4) Occupational Safety, Health & Working Conditions Code 2020.",
      year: "2024 Prelim",
      difficulty: "medium"
    }
  ],
  ip_law: [
    {
      id: "ip_001",
      question: "Under the Patents Act 1970, an invention is not patentable if it is:",
      options: [
        "Novel and has industrial applicability",
        "A discovery of a natural phenomenon with no new use",
        "A new process for making a known compound",
        "A business method implemented through a technical process"
      ],
      answer: 1,
      explanation: "Section 3(c) Patents Act: Discovery of a scientific principle or abstract theory or discovery of any living thing in nature is NOT patentable. A natural phenomenon per se is not patentable.",
      year: "2022 Mains",
      difficulty: "medium"
    },
    {
      id: "ip_002",
      question: "Copyright in a literary work subsists for:",
      options: [
        "Life of author + 50 years",
        "Life of author + 60 years",
        "60 years from publication",
        "Life of author only"
      ],
      answer: 1,
      explanation: "Section 22 Copyright Act 1957: Copyright in literary, dramatic, musical, and artistic works subsists for the lifetime of the author plus 60 years from the beginning of the calendar year following death.",
      year: "2024 Prelim",
      difficulty: "easy"
    }
  ]
};

// Flatten all questions for mixed practice
const ALL_QUESTIONS = Object.values(QUESTIONS).flat();

// Get questions by subject
function getQuestionsBySubject(subject) {
  return QUESTIONS[subject] || [];
}

// Get random questions
function getRandomQuestions(count, subject = null) {
  const pool = subject ? getQuestionsBySubject(subject) : ALL_QUESTIONS;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

// Subject metadata
const SUBJECTS = {
  crpc: { name: "CrPC / BNSS", icon: "⚖️", color: "#e74c3c", count: () => QUESTIONS.crpc.length },
  ipc_bns: { name: "IPC / BNS", icon: "🔒", color: "#c0392b", count: () => QUESTIONS.ipc_bns.length },
  evidence: { name: "Evidence Act", icon: "📋", color: "#8e44ad", count: () => QUESTIONS.evidence.length },
  cpc: { name: "CPC & Civil Laws", icon: "📜", color: "#2980b9", count: () => QUESTIONS.cpc.length },
  constitutional: { name: "Constitutional Law", icon: "🏛️", color: "#27ae60", count: () => QUESTIONS.constitutional.length },
  contracts: { name: "Contract & Arbitration", icon: "🤝", color: "#f39c12", count: () => QUESTIONS.contracts.length },
  family_law: { name: "Family & Personal Laws", icon: "👨‍👩‍👧", color: "#e67e22", count: () => QUESTIONS.family_law.length },
  property_law: { name: "Property & SARFAESI", icon: "🏠", color: "#16a085", count: () => QUESTIONS.property_law.length },
  ni_act: { name: "NI Act (Cheque Bounce)", icon: "💳", color: "#2c3e50", count: () => QUESTIONS.ni_act.length },
  pc_act: { name: "PC Act / Anti-Corruption", icon: "🛡️", color: "#7f8c8d", count: () => QUESTIONS.pc_act.length },
  labour: { name: "Labour Laws", icon: "👷", color: "#d35400", count: () => QUESTIONS.labour.length },
  ip_law: { name: "IP Laws", icon: "💡", color: "#8e44ad", count: () => QUESTIONS.ip_law.length }
};
