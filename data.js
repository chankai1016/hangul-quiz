/* =============================================================
   한글 자모 데이터 / データ / data
   h : 字母 (한 글자)      r : ローマ字 (文化観光部2000年式)
   d : 誤答候補            c : カテゴリ
   n : 解説 { ja, zh, en }
   ============================================================= */

const ITEMS = [
  /* ---------- 基本子音 / 基本子音 / basic ---------- */
  {h:'가', r:'ga',  d:['ka','kka','na'],  c:'basic', n:null},
  {h:'나', r:'na',  d:['da','ra','ma'],   c:'basic', n:null},
  {h:'다', r:'da',  d:['ta','na','ba'],   c:'basic', n:null},
  {h:'라', r:'ra',  d:['na','da','la'],   c:'basic', n:{
    ja:'語頭のㄹは巻き舌気味の「ラ」。日本語のラ行より舌先を強く弾く。',
    zh:'字首的ㄹ是帶彈舌感的「拉」，舌尖比注音的ㄌ彈得更用力。',
    en:'Word-initial ㄹ is a tapped r: flick the tongue tip harder than an English l.'}},
  {h:'마', r:'ma',  d:['ba','na','pa'],   c:'basic', n:null},
  {h:'바', r:'ba',  d:['pa','ppa','ma'],  c:'basic', n:null},
  {h:'사', r:'sa',  d:['ssa','ja','cha'], c:'basic', n:null},
  {h:'자', r:'ja',  d:['cha','jja','sa'], c:'basic', n:{
    ja:'ㅈは有気にしない。「チャ」と「ジャ」の中間。',
    zh:'ㅈ不送氣，介於「ㄐ」與「ㄑ」之間，實際更接近不送氣的ㄐ。',
    en:'ㅈ is unaspirated: between English j and ch, but closer to j.'}},
  {h:'차', r:'cha', d:['ja','ka','ssa'],  c:'basic', n:null},
  {h:'카', r:'ka',  d:['ga','kka','ta'],  c:'basic', n:{
    ja:'ㅋは有気音。日本語のカより息が強い。',
    zh:'ㅋ是送氣音，氣流比國語的ㄍ強，接近ㄎ但更短促。',
    en:'ㅋ is aspirated k with a puff of air, unlike ㄱ.'}},
  {h:'타', r:'ta',  d:['da','tta','pa'],  c:'basic', n:null},
  {h:'파', r:'pa',  d:['ba','ppa','ha'],  c:'basic', n:null},
  {h:'하', r:'ha',  d:['ka','pa','heo'],  c:'basic', n:null},
  {h:'아', r:'a',   d:['eo','ya','o'],    c:'basic', n:{
    ja:'初声のㅇは音を出さない。母音だけが響く。',
    zh:'字首的ㅇ不發音，只有母音本身發聲。',
    en:'Initial ㅇ is silent: only the vowel sounds.'}},
  {h:'까', r:'kka', d:['ka','ga','tto'],  c:'basic', n:{
    ja:'濃音。喉を締めてから弾く。日本語の促音「ッカ」で代用できる。',
    zh:'濃音。先繃緊喉嚨再彈開，接近在「ㄍㄚ」前加一個短停頓。',
    en:'Tense: tighten the throat, hold, then release. Like the k in ski, but harder.'}},
  {h:'따', r:'tta', d:['ta','da','kka'],  c:'basic', n:{
    ja:'濃音。舌先を強く付けてから離す。',
    zh:'濃音。舌尖先用力抵住齒齦，再放開。',
    en:'Tense t: press the tongue tip hard, then release.'}},
  {h:'빠', r:'ppa', d:['pa','ba','tta'],  c:'basic', n:{
    ja:'濃音。唇を締めてから破裂させる。',
    zh:'濃音。雙唇先閉緊，再一口氣爆開。',
    en:'Tense p: close the lips tight, then pop.'}},
  {h:'싸', r:'ssa', d:['sa','ja','cha'],  c:'basic', n:{
    ja:'濃音のs。日本語の「ッサ」に近い。',
    zh:'濃音的ㅅ，比一般的ㅅ更緊、更用力。',
    en:'Tense s: a hard, tight s with no release of air.'}},
  {h:'짜', r:'jja', d:['ja','cha','ssa'], c:'basic', n:{
    ja:'濃音。詰めて破る。「ッチャ」に近い。',
    zh:'濃音。先憋住再衝破，帶緊繃感。',
    en:'Tense j: hold the air, then release sharply.'}},

  /* ---------- 激音・濃音 / 激音・濃音 / tense ---------- */
  {h:'끄', r:'kkeu', d:['keu','kku','tteu'], c:'tense', n:{
    ja:'母音ㅡとの組み合わせ。喉を詰めて「ク」と言う。日本語にない音。',
    zh:'與ㅡ結合的濃音。喉嚨先收緊再發出「克」，國語沒有對應音。',
    en:'Tense k plus ㅡ. Squeeze the throat first; there is no English equivalent.'}},
  {h:'꼬', r:'kko',  d:['ko','go','tto'],    c:'tense', n:null},
  {h:'꾸', r:'kku',  d:['ku','gu','kkeu'],   c:'tense', n:null},
  {h:'끼', r:'kki',  d:['ki','gi','chi'],    c:'tense', n:null},
  {h:'또', r:'tto',  d:['to','do','kko'],    c:'tense', n:null},
  {h:'뚜', r:'ttu',  d:['tu','du','tteu'],   c:'tense', n:null},
  {h:'뜨', r:'tteu', d:['teu','deu','kkeu'], c:'tense', n:null},
  {h:'띠', r:'tti',  d:['ti','di','chi'],    c:'tense', n:null},
  {h:'뽀', r:'ppo',  d:['po','bo','ppeu'],   c:'tense', n:null},
  {h:'뿌', r:'ppu',  d:['pu','bu','ppo'],    c:'tense', n:null},
  {h:'쁘', r:'ppeu', d:['peu','beu','ppo'],  c:'tense', n:null},
  {h:'삐', r:'ppi',  d:['pi','bi','ssi'],    c:'tense', n:null},
  {h:'쏘', r:'sso',  d:['so','jo','sseu'],   c:'tense', n:null},
  {h:'쑤', r:'ssu',  d:['su','ju','sso'],    c:'tense', n:null},
  {h:'쓰', r:'sseu', d:['seu','jeu','ssu'],  c:'tense', n:null},
  {h:'씨', r:'ssi',  d:['si','ji','sseu'],   c:'tense', n:{
    ja:'씨は「種」「氏」のほか、敬称「〜さん」の意味でも使う。',
    zh:'씨除了「種子」「氏」，也當作敬稱「～先生／小姐」使用。',
    en:'씨 means seed or clan name, and also works as the polite suffix Mr./Ms.'}},
  {h:'쪼', r:'jjo',  d:['jo','cho','jjeu'],  c:'tense', n:null},
  {h:'찌', r:'jji',  d:['ji','chi','jjeu'],  c:'tense', n:null},

  /* ---------- 母音 / 母音 / vowel ---------- */
  {h:'어', r:'eo',  d:['o','eu','e'],   c:'vowel', n:{
    ja:'ㅓは日本語のオより唇を横に広げる。口を軽く開いた「ア」寄りのオ。',
    zh:'ㅓ比國語的「ㄛ」更扁，嘴唇向兩側拉開，介於「ㄚ」和「ㄛ」之間。',
    en:'ㅓ spreads the lips sideways: an open aw, not a rounded o.'}},
  {h:'오', r:'o',   d:['eo','u','oe'],  c:'vowel', n:{
    ja:'ㅗは唇を丸く突き出す。ㅓとの違いが最初の関門。',
    zh:'ㅗ要圓唇並向前突出，與ㅓ的差別是第一個關卡。',
    en:'ㅗ rounds and pushes the lips forward. The ㅓ/ㅗ split is the first real hurdle.'}},
  {h:'우', r:'u',   d:['eu','o','wi'],  c:'vowel', n:{
    ja:'ㅜは唇を強く丸める。',
    zh:'ㅜ要用力圓唇，像「烏」但更緊。',
    en:'ㅜ rounds the lips strongly, like oo but tighter.'}},
  {h:'으', r:'eu',  d:['u','eo','i'],   c:'vowel', n:{
    ja:'唇を平らに横へ引いた「ウ」。日本語のウとは別物。',
    zh:'嘴唇向兩側拉平發出的「ㅡ」，和國語的「ㄨ」完全不同。',
    en:'Lips flat and pulled wide: an unrounded u with no English equivalent.'}},
  {h:'이', r:'i',   d:['ui','e','wi'],  c:'vowel', n:null},
  {h:'애', r:'ae',  d:['e','ya','a'],   c:'vowel', n:{
    ja:'現代ソウル方言ではㅐとㅔの区別はほぼ消えている。音より綴りで覚える。',
    zh:'現代首爾話中ㅐ與ㅔ幾乎同音，要靠拼寫來分辨。',
    en:'In modern Seoul speech ㅐ and ㅔ sound the same. Learn them by spelling.'}},
  {h:'에', r:'e',   d:['ae','eo','ye'], c:'vowel', n:{
    ja:'ㅐと同音になりつつある。書き分けが問われる。',
    zh:'和ㅐ逐漸同音，考試考的是能不能寫對。',
    en:'Increasingly identical to ㅐ. Tests ask you to spell it correctly.'}},
  {h:'얘', r:'yae', d:['ye','ya','e'],  c:'vowel', n:{
    ja:'ㅒは「イェ」。使用頻度は低い。',
    zh:'ㅒ讀「耶」，使用頻率很低。',
    en:'ㅒ is yae. Rare in everyday text.'}},
  {h:'예', r:'ye',  d:['yae','e','yeo'], c:'vowel', n:null},
  {h:'외', r:'oe',  d:['we','wi','eo'], c:'vowel', n:{
    ja:'綴りは oe だが、実際の発音は「ウェ」[we] に近い。',
    zh:'拼寫是 oe，實際發音接近「威」[we]。',
    en:'Spelled oe, but pronounced close to we [we].'}},
  {h:'위', r:'wi',  d:['oe','ui','u'],  c:'vowel', n:null},
  {h:'의', r:'ui',  d:['wi','i','eu'],  c:'vowel', n:{
    ja:'語頭は「ウィ」。助詞「의」は「エ」、それ以外は「イ」になることが多い。',
    zh:'字首讀「ㅟ」。當助詞時讀「ㅔ」，其他位置多讀「ㅣ」。',
    en:'Word-initial it is wi. As a particle it becomes e, elsewhere usually i.'}},
  {h:'와', r:'wa',  d:['wo','wae','o'], c:'vowel', n:null},
  {h:'왜', r:'wae', d:['we','wa','oe'], c:'vowel', n:{
    ja:'왜・외・웨 はほぼ同音。「なぜ」の意味の副詞でもある。',
    zh:'왜、외、웨 幾乎同音。왜 另外是「為什麼」的意思。',
    en:'왜, 외 and 웨 are near-identical. 왜 also means why.'}},
  {h:'워', r:'wo',  d:['wa','we','u'],  c:'vowel', n:null},
  {h:'웨', r:'we',  d:['wae','wo','wi'], c:'vowel', n:null},
  {h:'거', r:'geo', d:['go','gu','geu'], c:'vowel', n:null},
  {h:'고', r:'go',  d:['geo','gu','geu'], c:'vowel', n:null},
  {h:'구', r:'gu',  d:['go','geu','gi'], c:'vowel', n:null},
  {h:'그', r:'geu', d:['gu','geo','gi'], c:'vowel', n:null},
  {h:'기', r:'gi',  d:['geu','ji','ki'], c:'vowel', n:null},
  {h:'개', r:'gae', d:['ge','ga','geu'], c:'vowel', n:{
    ja:'개は「犬」、게は「カニ」。同音化するが綴りで区別する。',
    zh:'개是「狗」，게是「螃蟹」。兩者同音，靠拼寫分辨。',
    en:'개 is dog, 게 is crab. Same sound, different spelling.'}},
  {h:'게', r:'ge',  d:['gae','geo','gi'], c:'vowel', n:null},
  {h:'너', r:'neo', d:['no','neu','ne'], c:'vowel', n:null},
  {h:'노', r:'no',  d:['neo','nu','ne'], c:'vowel', n:null},
  {h:'누', r:'nu',  d:['no','neu','ni'], c:'vowel', n:null},
  {h:'느', r:'neu', d:['nu','neo','ni'], c:'vowel', n:null},
  {h:'니', r:'ni',  d:['ne','neu','ri'], c:'vowel', n:null},
  {h:'머', r:'meo', d:['mo','mu','me'], c:'vowel', n:null},
  {h:'모', r:'mo',  d:['meo','mu','me'], c:'vowel', n:null},
  {h:'무', r:'mu',  d:['mo','meu','mi'], c:'vowel', n:null},
  {h:'메', r:'me',  d:['mae','meo','mi'], c:'vowel', n:null},
  {h:'매', r:'mae', d:['me','ma','mo'], c:'vowel', n:{
    ja:'매は「毎」「梅」「売る」など漢字語に多い。매우 は「とても」。',
    zh:'매常用於漢字語，如「每」「梅」「賣」。매우 是「非常」。',
    en:'매 carries many Sino-Korean words: every, plum, to sell. 매우 means very.'}},
  {h:'서', r:'seo', d:['so','su','se'], c:'vowel', n:null},
  {h:'소', r:'so',  d:['seo','su','se'], c:'vowel', n:{
    ja:'소は「牛」、서は「西」。母音1字で意味が変わる。',
    zh:'소是「牛」，서是「西」。只差一個母音，意思完全不同。',
    en:'소 is cow, 서 is west. One vowel changes the word.'}},
  {h:'수', r:'su',  d:['so','seu','si'], c:'vowel', n:null},
  {h:'스', r:'seu', d:['su','seo','si'], c:'vowel', n:null},
  {h:'시', r:'si',  d:['se','seu','ssi'], c:'vowel', n:{
    ja:'ㅅは母音ㅣの前で「シ」に近くなる。',
    zh:'ㅅ在ㅣ前面會變成接近「西」的音。',
    en:'ㅅ before ㅣ turns into a sh-like sound.'}},
  {h:'새', r:'sae', d:['se','sa','so'], c:'vowel', n:{
    ja:'새は「鳥」、세は「三」の漢字語。',
    zh:'새是「鳥」，세是「三」的漢字音。',
    en:'새 is bird; 세 is the Sino-Korean three.'}},
  {h:'세', r:'se',  d:['sae','seo','si'], c:'vowel', n:null},
  {h:'저', r:'jeo', d:['jo','ju','je'], c:'vowel', n:{
    ja:'저は「私」の謙譲形。「저는」で「私は」。',
    zh:'저是「我」的謙讓形，저는 就是「我（主題）」。',
    en:'저 is the humble I. 저는 means as for me.'}},
  {h:'조', r:'jo',  d:['jeo','ju','je'], c:'vowel', n:null},
  {h:'주', r:'ju',  d:['jo','jeu','ji'], c:'vowel', n:null},
  {h:'지', r:'ji',  d:['je','jeu','jja'], c:'vowel', n:null},
  {h:'허', r:'heo', d:['ho','hu','he'], c:'vowel', n:null},
  {h:'호', r:'ho',  d:['heo','hu','he'], c:'vowel', n:null},
  {h:'후', r:'hu',  d:['ho','heu','hi'], c:'vowel', n:null},
  {h:'히', r:'hi',  d:['he','heu','ki'], c:'vowel', n:null},

  /* ---------- パッチム / 終聲 / final ---------- */
  {h:'각', r:'gak', d:['gan','gat','gang'], c:'final', n:{
    ja:'終声ㄱは内破音[k̚]。喉の奥で止めて息を出さない。',
    zh:'終聲ㄱ是內破音[k̚]，在喉嚨深處停住、不吐氣。',
    en:'Final ㄱ is an unreleased [k̚]: block the air and stop.'}},
  {h:'간', r:'gan', d:['gal','gam','gang'], c:'final', n:null},
  {h:'갈', r:'gal', d:['gan','gam','gak'], c:'final', n:{
    ja:'終声ㄹは[l]。舌先を上に付けたまま離さない。',
    zh:'終聲ㄹ是[l]，舌尖抵住上齒齦後不放開。',
    en:'Final ㄹ is [l]: keep the tongue tip on the ridge.'}},
  {h:'감', r:'gam', d:['gan','gang','gap'], c:'final', n:null},
  {h:'갑', r:'gap', d:['gak','gat','bap'], c:'final', n:{
    ja:'終声ㅂは内破音[p̚]。唇を閉じて止める。',
    zh:'終聲ㅂ是內破音[p̚]，閉緊雙唇停住。',
    en:'Final ㅂ is an unreleased [p̚]: close the lips and stop.'}},
  {h:'강', r:'gang', d:['gan','gam','gak'], c:'final', n:{
    ja:'終声ㅇは鼻音[ŋ]。「ガン」ではなく鼻に抜ける「ガング」。',
    zh:'終聲ㅇ是鼻音[ŋ]，不是「甘」，要讓氣從鼻腔出來。',
    en:'Final ㅇ is [ŋ] as in song: the air leaves through the nose.'}},
  {h:'국', r:'guk', d:['gung','gun','gut'], c:'final', n:{
    ja:'国・スープの「국」。국이→[구기] と連音化する。',
    zh:'國、湯的「국」。국이 會連音成 [구기]。',
    en:'국 means soup or nation. 국이 links to [구기].'}},
  {h:'눈', r:'nun', d:['num','nul','nung'], c:'final', n:{
    ja:'눈は「目」と「雪」の2語。',
    zh:'눈同時是「眼睛」和「雪」。',
    en:'눈 means both eye and snow.'}},
  {h:'밥', r:'bap', d:['bat','bak','bam'], c:'final', n:{
    ja:'밥は「ご飯」。밥을→[바블]。',
    zh:'밥是「飯」。밥을 連音成 [바블]。',
    en:'밥 is rice or a meal. 밥을 links to [바블].'}},
  {h:'옷', r:'ot', d:['os','on','ok'], c:'final', n:{
    ja:'終声ㅅは代表音[t̚]。옷을→[오슬]。',
    zh:'終聲ㅅ的代表音是[t̚]。옷을 連音成 [오슬]。',
    en:'Final ㅅ neutralises to [t̚]. 옷을 links to [오슬].'}},
  {h:'있', r:'it', d:['iss','ik','in'], c:'final', n:{
    ja:'終声ㅆも代表音[t̚]。있어→[이써]。',
    zh:'終聲ㅆ的代表音也是[t̚]。있어 讀 [이써]。',
    en:'Final ㅆ also neutralises to [t̚]. 있어 is [이써].'}},
  {h:'꽃', r:'kkot', d:['kkos','kkon','kkok'], c:'final', n:{
    ja:'終声ㅊは代表音[t̚]。꽃이→[꼬치]。',
    zh:'終聲ㅊ的代表音是[t̚]。꽃이 連音成 [꼬치]。',
    en:'Final ㅊ neutralises to [t̚]. 꽃이 links to [꼬치].'}},
  {h:'밖', r:'bak', d:['bat','bang','ppak'], c:'final', n:{
    ja:'終声ㅋは代表音[k̚]。밖에→[바께]。',
    zh:'終聲ㅋ的代表音是[k̚]。밖에 連音成 [바께]。',
    en:'Final ㅋ neutralises to [k̚]. 밖에 links to [바께].'}},
  {h:'낮', r:'nat', d:['nas','nan','naj'], c:'final', n:{
    ja:'終声ㅈは代表音[t̚]。낮에→[나제]。',
    zh:'終聲ㅈ的代表音是[t̚]。낮에 連音成 [나제]。',
    en:'Final ㅈ neutralises to [t̚]. 낮에 links to [나제].'}},
  {h:'값', r:'gap', d:['gaps','gak','gam'], c:'final', n:{
    ja:'二重パッチムㅄの代表音は[p̚]。값이→[갑씨]。',
    zh:'雙終聲ㅄ的代表音是[p̚]。값이 讀 [갑씨]。',
    en:'The double final ㅄ reduces to [p̚]. 값이 is [갑씨].'}},
  {h:'삶', r:'sam', d:['salm','sab','sal'], c:'final', n:{
    ja:'ㄻの代表音は[m]。삶이→[살미] とㄹが生き返る。',
    zh:'ㄻ的代表音是[m]。삶이 讀 [살미]，ㄹ會復活。',
    en:'ㄻ reduces to [m]. In 삶이 the ㄹ comes back: [살미].'}},
  {h:'앉', r:'an', d:['anj','al','am'], c:'final', n:{
    ja:'ㄵの代表音は[n]。앉아→[안자]。',
    zh:'ㄵ的代表音是[n]。앉아 讀 [안자]。',
    en:'ㄵ reduces to [n]. 앉아 is [안자].'}},
  {h:'많', r:'man', d:['manh','mal','mang'], c:'final', n:{
    ja:'ㄶの代表音は[n]でㅎは無音。많아→[마나]。',
    zh:'ㄶ的代表音是[n]，ㅎ不發音。많아 讀 [마나]。',
    en:'ㄶ reduces to [n] and the ㅎ is silent. 많아 is [마나].'}},
  {h:'닭', r:'dak', d:['dalk','dal','dang'], c:'final', n:{
    ja:'ㄺの代表音は[k̚]。닭을→[달글] と連音化する。',
    zh:'ㄺ的代表音是[k̚]。닭을 連音成 [달글]。',
    en:'ㄺ reduces to [k̚]. 닭을 links to [달글].'}},
  {h:'읽', r:'ik', d:['ilg','il','ing'], c:'final', n:{
    ja:'읽다→[익따]、읽어→[일거]。ㄹが表に出るかは後続音しだい。',
    zh:'읽다 讀 [익따]，읽어 讀 [일거]。ㄹ是否出現取決於後面的音。',
    en:'읽다 is [익따] but 읽어 is [일거]: the ㄹ surfaces before a vowel.'}},
  {h:'젊', r:'jeom', d:['jeolm','jeol','jeong'], c:'final', n:{
    ja:'ㄻの代表音は[m]。젊다→[점따]。',
    zh:'ㄻ的代表音是[m]。젊다 讀 [점따]。',
    en:'ㄻ reduces to [m]. 젊다 is [점따].'}},
  {h:'핥', r:'halt', d:['halh','hal','han'], c:'final', n:{
    ja:'ㄾの代表音は[l]。핥아→[할타]。',
    zh:'ㄾ的代表音是[l]。핥아 讀 [할타]。',
    en:'ㄾ reduces to [l]. 핥아 is [할타].'}},
  {h:'끓', r:'kkeul', d:['kkeulh','kkeun','kkeum'], c:'final', n:{
    ja:'ㄿの代表音は[p̚]。끓다→[끌따]。',
    zh:'ㄿ的代表音是[p̚]。끓다 讀 [끌따]。',
    en:'ㄿ reduces to [p̚]. 끓다 is [끌따].'}},
  {h:'없', r:'eop', d:['eops','eot','eom'], c:'final', n:{
    ja:'ㅄの代表音は[p̚]。없어→[업써]。',
    zh:'ㅄ的代表音是[p̚]。없어 讀 [업써]。',
    en:'ㅄ reduces to [p̚]. 없어 is [업써].'}},
  {h:'몫', r:'mok', d:['moks','mot','mong'], c:'final', n:{
    ja:'몫は「分け前」。몫이→[목씨]。',
    zh:'몫是「份額」。몫이 讀 [목씨]。',
    en:'몫 means share or portion. 몫이 is [목씨].'}},
  {h:'넋', r:'neok', d:['neoks','neot','neong'], c:'final', n:{
    ja:'넋は「魂」。넋이→[넉씨]。',
    zh:'넋是「靈魂」。넋이 讀 [넉씨]。',
    en:'넋 means soul. 넋이 is [넉씨].'}},
  {h:'닳', r:'dal', d:['dalh','dan','dam'], c:'final', n:{
    ja:'ㅀの代表音は[l]でㅎは無音。닳아→[달아]。',
    zh:'ㅀ的代表音是[l]，ㅎ不發音。닳아 讀 [달아]。',
    en:'ㅀ reduces to [l] and the ㅎ is silent. 닳아 is [달아].'}},
  {h:'짧', r:'jjal', d:['jjalb','jjak','jjam'], c:'final', n:{
    ja:'ㄼの代表音は[l]。짧다→[짤따]。여덟 も同じ。밟다 だけは[밥따]の例外。',
    zh:'ㄼ的代表音是[l]。짧다 讀 [짤따]，여덟 也一樣；只有 밟다 例外讀 [밥따]。',
    en:'ㄼ reduces to [l]: 짧다 is [짤따]. 밟다 is the one exception, [밥따].'}}
];

/* =============================================================
   字母の情報 / 字母資訊 / letter reference
   n = 名前(ハングル)  rr = ローマ字  t = 種別キー  d = 説明
   ============================================================= */

const CHO_LIST = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
const JUNG_LIST = ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'];
const JONG_LIST = ['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];

const CHO_INFO = {
  'ㄱ': {n:'기역', rr:'giyeok', t:'plain', d:{
    ja:'軟口蓋を軽く閉じる「k」寄りの「g」。有気にしない。',
    zh:'軟顎輕輕閉合的「ㄍ」，不送氣。',
    en:'Unaspirated g, made by closing the soft palate lightly.'}},
  'ㄲ': {n:'쌍기역', rr:'ssanggiyeok', t:'tense', d:{
    ja:'喉を締めてから弾く。日本語の促音「ッカ」に近い。',
    zh:'喉嚨先收緊再彈開，接近「ㄍㄚ」前加短停頓。',
    en:'Tighten the throat, hold, then release. Like a hard k.'}},
  'ㄴ': {n:'니은', rr:'nieun', t:'nasal', d:{
    ja:'舌尖を上の歯茎に付ける「n」。',
    zh:'舌尖抵住上齒齦的「ㄋ」。',
    en:'n with the tongue tip on the ridge behind the teeth.'}},
  'ㄷ': {n:'디귿', rr:'digeut', t:'plain', d:{
    ja:'舌尖で弾く「t」寄りの「d」。有気にしない。',
    zh:'舌尖彈開的「ㄉ」，不送氣。',
    en:'Unaspirated d, made with the tongue tip.'}},
  'ㄸ': {n:'쌍디귿', rr:'ssangdigeut', t:'tense', d:{
    ja:'舌先を強く付けてから離す。',
    zh:'舌尖用力抵住再放開。',
    en:'Tense t: press hard, then release.'}},
  'ㄹ': {n:'리을', rr:'rieul', t:'liquid', d:{
    ja:'舌尖を一度はじく「r」。語頭では巻き舌気味のラ行。',
    zh:'舌尖輕彈一次的「ㄌ」，字首時帶彈舌感。',
    en:'A single tap of the tongue tip, like the r in Spanish pero.'}},
  'ㅁ': {n:'미음', rr:'mieum', t:'nasal', d:{
    ja:'両唇を閉じて鼻に通す「m」。',
    zh:'雙唇閉合、氣從鼻腔出的「ㄇ」。',
    en:'m, with both lips closed.'}},
  'ㅂ': {n:'비읍', rr:'bieup', t:'plain', d:{
    ja:'両唇で破裂させる「p」寄りの「b」。有気にしない。',
    zh:'雙唇爆開的「ㄅ」，不送氣。',
    en:'Unaspirated b, made with both lips.'}},
  'ㅃ': {n:'쌍비읍', rr:'ssangbieup', t:'tense', d:{
    ja:'唇を締めてから破裂させる。',
    zh:'雙唇先閉緊再爆開。',
    en:'Tense p: close tight, then pop.'}},
  'ㅅ': {n:'시옷', rr:'siot', t:'plain', d:{
    ja:'歯茎に息を通す「s」。母音ㅣ・ㅑ系の前では「sh」寄り。',
    zh:'氣流通過齒齦的「ㄙ」；在ㅣ、ㅑ前面接近「ㄒ」。',
    en:'s with air over the ridge; before ㅣ and y-vowels it turns sh-like.'}},
  'ㅆ': {n:'쌍시옷', rr:'ssangsiot', t:'tense', d:{
    ja:'強く擦る「ss」。',
    zh:'用力摩擦的緊音「ss」。',
    en:'Tense s: a harder, tighter s.'}},
  'ㅇ': {n:'이응', rr:'ieung', t:'nasal', d:{
    ja:'初声では音を出さない（母音だけ）。終声では[ŋ]。',
    zh:'字首不發音（只有母音）；當終聲時讀[ŋ]。',
    en:'Silent at the start of a syllable; as a final it is [ŋ].'}},
  'ㅈ': {n:'지읒', rr:'jieut', t:'plain', d:{
    ja:'「j」と「ch」の中間。有気にしない。',
    zh:'介於「ㄐ」與「ㄑ」之間，不送氣。',
    en:'Unaspirated, between j and ch.'}},
  'ㅉ': {n:'쌍지읒', rr:'ssangjieut', t:'tense', d:{
    ja:'詰めて破る「jj」。',
    zh:'憋住再衝破的緊音。',
    en:'Tense j: hold the air, then release.'}},
  'ㅊ': {n:'치읓', rr:'chieut', t:'aspirated', d:{
    ja:'有気の「ch」。息を強く出す。',
    zh:'送氣的「ㄑ」。',
    en:'Aspirated ch with a strong puff.'}},
  'ㅋ': {n:'키읔', rr:'kieuk', t:'aspirated', d:{
    ja:'有気の「k」。日本語のカ行より息が強い。',
    zh:'送氣的「ㄎ」。',
    en:'Aspirated k.'}},
  'ㅌ': {n:'티읕', rr:'tieut', t:'aspirated', d:{
    ja:'有気の「t」。',
    zh:'送氣的「ㄊ」。',
    en:'Aspirated t.'}},
  'ㅍ': {n:'피읖', rr:'pieup', t:'aspirated', d:{
    ja:'有気の「p」。',
    zh:'送氣的「ㄆ」。',
    en:'Aspirated p.'}},
  'ㅎ': {n:'히읗', rr:'hieut', t:'aspirated', d:{
    ja:'喉から息を出す「h」。',
    zh:'從喉嚨送氣的「ㄏ」。',
    en:'h, breathed from the throat.'}}
};

const JUNG_INFO = {
  'ㅏ': {t:'mono', d:{ja:'日本語のアより口を大きく開く。', zh:'嘴巴張得比國語的「ㄚ」更大。', en:'A wide open a, wider than in English father.'}},
  'ㅐ': {t:'mono', d:{ja:'口を大きめに開いた「エ」。現代ソウルではㅔとほぼ同音。', zh:'嘴巴張較開的「ㅔ」。現代首爾話與ㅔ幾乎同音。', en:'An open e. In Seoul it now sounds like ㅔ.'}},
  'ㅑ': {t:'diph', d:{ja:'「イ」から「ア」へ。', zh:'從「ㄧ」滑向「ㄚ」。', en:'A glide from i to a.'}},
  'ㅒ': {t:'diph', d:{ja:'「イェ」。「ヤ」と混同しない。', zh:'讀「耶」，不要和「呀」混淆。', en:'yae. Do not confuse it with ya.'}},
  'ㅓ': {t:'mono', d:{ja:'口を軽く開いた「オ」寄りの「ア」。唇を横に広げる。', zh:'嘴唇向兩側拉開，介於「ㄚ」與「ㄛ」之間。', en:'An open aw with the lips spread, not rounded.'}},
  'ㅔ': {t:'mono', d:{ja:'「エ」。ㅐとの区別が消えつつある。', zh:'讀「ㅔ」，與ㅐ的區別正逐漸消失。', en:'e. The contrast with ㅐ is fading.'}},
  'ㅕ': {t:'diph', d:{ja:'「イ」から「オ（ㅓ）」へ。', zh:'從「ㄧ」滑向ㅓ。', en:'A glide from i to eo.'}},
  'ㅖ': {t:'diph', d:{ja:'「イェ」。', zh:'讀「耶」。', en:'ye.'}},
  'ㅗ': {t:'mono', d:{ja:'唇を丸く突き出す「オ」。', zh:'圓唇並向前突出的「ㄛ」。', en:'A rounded o with the lips pushed forward.'}},
  'ㅘ': {t:'diph', d:{ja:'「ウ」から「ア」へ。', zh:'從「ㄨ」滑向「ㄚ」。', en:'A glide from u to a.'}},
  'ㅙ': {t:'diph', d:{ja:'「ウェ」。ㅚ・ㅞとほぼ同音。', zh:'讀「威」，與ㅚ、ㅞ幾乎同音。', en:'wae, nearly identical to ㅚ and ㅞ.'}},
  'ㅚ': {t:'diph', d:{ja:'綴りは「oe」だが実際は「ウェ」[we] に近い。', zh:'拼寫是 oe，實際接近[we]。', en:'Spelled oe but pronounced close to we.'}},
  'ㅛ': {t:'diph', d:{ja:'「イ」から「オ」へ。', zh:'從「ㄧ」滑向「ㄛ」。', en:'A glide from i to o.'}},
  'ㅜ': {t:'mono', d:{ja:'唇を強く丸めた「ウ」。', zh:'用力圓唇的「ㄨ」。', en:'A strongly rounded u.'}},
  'ㅝ': {t:'diph', d:{ja:'「ウ」から「オ（ㅓ）」へ。', zh:'從「ㄨ」滑向ㅓ。', en:'A glide from u to eo.'}},
  'ㅞ': {t:'diph', d:{ja:'「ウェ」。', zh:'讀「威」。', en:'we.'}},
  'ㅟ': {t:'diph', d:{ja:'「ウィ」。', zh:'讀「ㄨㄧ」。', en:'wi.'}},
  'ㅠ': {t:'diph', d:{ja:'「イ」から「ウ」へ。', zh:'從「ㄧ」滑向「ㄨ」。', en:'A glide from i to u.'}},
  'ㅡ': {t:'mono', d:{ja:'唇を平らに引いた「ウ」。日本語のウとは別物。', zh:'嘴唇向兩側拉平的「ㅡ」，與國語的「ㄨ」完全不同。', en:'An unrounded u with flat lips. No English equivalent.'}},
  'ㅢ': {t:'diph', d:{ja:'「ウィ」と「イ」の中間。助詞では「エ」。', zh:'介於「ㅟ」與「ㅣ」之間；當助詞時讀ㅔ。', en:'Between wi and i; as a particle it becomes e.'}},
  'ㅣ': {t:'mono', d:{ja:'日本語のイより唇を横に引く。', zh:'嘴唇向兩側拉開的「ㄧ」。', en:'i with the lips pulled wide.'}}
};

const JONG_INFO = {
  'ㄱ': {t:'stop', s:'[k̚]', d:{ja:'喉の奥で止めて息を出さない。', zh:'在喉嚨深處停住、不吐氣。', en:'Block at the back of the throat with no release.'}},
  'ㄲ': {t:'stop', s:'[k̚]', d:{ja:'代表音は[k̚]。', zh:'代表音是[k̚]。', en:'Reduces to [k̚].'}},
  'ㄳ': {t:'stop', s:'[k̚]', d:{ja:'ㄱ＋ㅅだが代表音は[k̚]（삯）。', zh:'雖是ㄱ＋ㅅ，代表音仍是[k̚]（삯）。', en:'ㄱ plus ㅅ, but the sound is [k̚] as in 삯.'}},
  'ㄴ': {t:'nasal', s:'[n]', d:{ja:'舌尖を上の歯茎に付けたまま。', zh:'舌尖抵住上齒齦不放。', en:'Keep the tongue tip on the ridge.'}},
  'ㄵ': {t:'nasal', s:'[n]', d:{ja:'ㄴ＋ㅈだが代表音は[n]（앉）。', zh:'雖是ㄴ＋ㅈ，代表音是[n]（앉）。', en:'ㄴ plus ㅈ, but the sound is [n] as in 앉.'}},
  'ㄶ': {t:'nasal', s:'[n]', d:{ja:'ㅎは無音化する（많）。', zh:'ㅎ不發音（많）。', en:'The ㅎ goes silent, as in 많.'}},
  'ㄷ': {t:'stop', s:'[t̚]', d:{ja:'舌尖で止める。', zh:'用舌尖停住。', en:'Stop with the tongue tip.'}},
  'ㄹ': {t:'liquid', s:'[l]', d:{ja:'舌先を上に付けたまま離さない。', zh:'舌尖抵住上齒齦不放開。', en:'Hold the tongue tip against the ridge.'}},
  'ㄺ': {t:'stop', s:'[k̚]', d:{ja:'代表音は[k̚]（닭）。', zh:'代表音是[k̚]（닭）。', en:'Reduces to [k̚], as in 닭.'}},
  'ㄻ': {t:'nasal', s:'[m]', d:{ja:'ㄹ＋ㅁだが代表音は[m]（삶）。', zh:'雖是ㄹ＋ㅁ，代表音是[m]（삶）。', en:'ㄹ plus ㅁ, but the sound is [m] as in 삶.'}},
  'ㄼ': {t:'liquid', s:'[l]', d:{ja:'代表音は[l]（짧）。밟-だけ[b]の例外。', zh:'代表音是[l]（짧）；只有밟-例外讀[b]。', en:'Reduces to [l] as in 짧. Only 밟- keeps [b].'}},
  'ㄽ': {t:'liquid', s:'[l]', d:{ja:'代表音は[l]（곬）。', zh:'代表音是[l]（곬）。', en:'Reduces to [l], as in 곬.'}},
  'ㄾ': {t:'liquid', s:'[l]', d:{ja:'代表音は[l]（핥）。', zh:'代表音是[l]（핥）。', en:'Reduces to [l], as in 핥.'}},
  'ㄿ': {t:'stop', s:'[p̚]', d:{ja:'代表音は[p̚]（읊）。', zh:'代表音是[p̚]（읊）。', en:'Reduces to [p̚], as in 읊.'}},
  'ㅀ': {t:'liquid', s:'[l]', d:{ja:'ㅎは無音化する（닳）。', zh:'ㅎ不發音（닳）。', en:'The ㅎ goes silent, as in 닳.'}},
  'ㅁ': {t:'nasal', s:'[m]', d:{ja:'両唇を閉じたまま鼻に通す。', zh:'雙唇閉合，氣從鼻腔出。', en:'Lips closed, air through the nose.'}},
  'ㅂ': {t:'stop', s:'[p̚]', d:{ja:'唇を閉じて止める。', zh:'閉緊雙唇停住。', en:'Close the lips and stop.'}},
  'ㅄ': {t:'stop', s:'[p̚]', d:{ja:'代表音は[p̚]（값）。', zh:'代表音是[p̚]（값）。', en:'Reduces to [p̚], as in 값.'}},
  'ㅅ': {t:'stop', s:'[t̚]', d:{ja:'代表音は[t̚]（옷）。', zh:'代表音是[t̚]（옷）。', en:'Reduces to [t̚], as in 옷.'}},
  'ㅆ': {t:'stop', s:'[t̚]', d:{ja:'代表音は[t̚]（있）。', zh:'代表音是[t̚]（있）。', en:'Reduces to [t̚], as in 있.'}},
  'ㅇ': {t:'nasal', s:'[ŋ]', d:{ja:'鼻に抜ける「ng」。', zh:'從鼻腔出來的「ng」。', en:'ng as in song.'}},
  'ㅈ': {t:'stop', s:'[t̚]', d:{ja:'代表音は[t̚]（낮）。', zh:'代表音是[t̚]（낮）。', en:'Reduces to [t̚], as in 낮.'}},
  'ㅊ': {t:'stop', s:'[t̚]', d:{ja:'代表音は[t̚]（꽃）。', zh:'代表音是[t̚]（꽃）。', en:'Reduces to [t̚], as in 꽃.'}},
  'ㅋ': {t:'stop', s:'[k̚]', d:{ja:'代表音は[k̚]（밖）。', zh:'代表音是[k̚]（밖）。', en:'Reduces to [k̚], as in 밖.'}},
  'ㅌ': {t:'stop', s:'[t̚]', d:{ja:'代表音は[t̚]（밭）。', zh:'代表音是[t̚]（밭）。', en:'Reduces to [t̚], as in 밭.'}},
  'ㅍ': {t:'stop', s:'[p̚]', d:{ja:'代表音は[p̚]（앞）。', zh:'代表音是[p̚]（앞）。', en:'Reduces to [p̚], as in 앞.'}},
  'ㅎ': {t:'stop', s:'[t̚]', d:{ja:'代表音は[t̚]。ただし좋다のように無音化することもある。', zh:'代表音是[t̚]，但在좋다等詞中會不發音。', en:'Reduces to [t̚], though it can go silent as in 좋다.'}}
};
