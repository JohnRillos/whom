/-  *whom
|%
++  dejs
  =,  dejs:format
  |%
  ++  action
    ^-  $-(json ^action)
    %-  of
    :~  [%add-contact (ot contact+contact ~)]
        [%del-contact (ot key+contact-key ~)]
    ==
  ++  opt  :: handle missing keys / null values
    |*  [=fist]
    |=  [ujon=(unit json)]
    ?~  ujon  ~
    ?~  u.ujon  ~
    `(fist u.ujon)
  ++  contact
    %-  ou
    :~  ship+(opt (se %p))
        info+(un (op sym info-value))
        custom+(un (om so))
    ==
  ++  contact-key
    |=  =json
    ?>  ?=([%s @t] json)
    ^-  (each @p @t)
    =/  =tape  (trip +.json)
    ?:  =('~' -.tape)
      [%.y ((se %p) json)]
    [%.n p.json]
  ::
  ++  info-value
    |=  =json
    ~|  "Invalid info value: {<json>}"
    ^-  contact-field
    ?:  ?=([%s @t] json)
      (so json)
    ?.  ?=([%o *] json)  !!
    %-  %-  of
        :~  [%date (ot year+ni month+ni day+ni ~)]
        ==
    json
  --
--
