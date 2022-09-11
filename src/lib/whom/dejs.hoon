/-  *whom
=,  dejs:format
|%
::
++  action
  ^-  $-(json ^action)
  %-  of
  :~  [%add-contact (ot ship+(mu (se %p)) contact+dj-contact ~)]
      [%del-contact (ot key+dj-contact-key ~)]
      [%edit-contact (ot key+dj-contact-key info+(op sym (mu dj-info-value)) ~)]
      [%edit-contact-ship (ot key+dj-contact-key ship+(mu (se %p)) ~)]
      [%add-field (ot key+(se %tas) def+dj-field-def ~)]
      [%del-field (ot key+(se %tas) ~)]
  ==
::
++  dj-contact
  %-  ou
  :~  info+(un (op sym dj-info-value))
  ==
::
++  dj-contact-key
  |=  =json
  ?>  ?=([%s @t] json)
  ^-  (each @p @t)
  =/  =tape  (trip +.json)
  ?:  =('~' -.tape)
    [%.y ((se %p) json)]
  [%.n p.json]
::
++  dj-info-value
  |=  =json
  ~|  "Invalid info value: {<json>}"
  ^-  info-field
  ?:  ?=([%s @t] json)
    [%text (so json)]
  ?.  ?=([%o *] json)  !!
  %-  %-  of
      :~  [%date dj-date]
      ==
  json
::
++  dj-date
  |=  =json
  ^-  @da
  =/  parsed=[y=@ud m=@ud d=@ud]
    ((ot year+ni month+ni day+ni ~) json)
  (year [[& y.parsed] m.parsed [d.parsed 0 0 0 ~]])
::
++  dj-field-def  (ot name+so type+dj-field-tag ~)
::
++  dj-field-tag
  |=  =json
  =/  =term  ((se %tas) json)
  ?:  ?=(field-type-tag term)  term
  ~|  "Invalid field type: {<term>}"  !!
--