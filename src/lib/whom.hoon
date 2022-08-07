/-  *whom
|%
++  dejs
  =,  dejs:format
  |%
  ++  action
    ^-  $-(json ^action)
    %-  of
    :~  [%add-contact (ot contact+contact ~)]
        [%del-contact (ot key+key ~)]
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
        name+(opt sa)
    ==
  ++  key
    |=  =json
    ?>  ?=([%s @t] json)
    ^-  (each @p @t)
    =/  =tape  (trip +.json)
    ?:  =('~' -.tape)
      [%.y ((se %p) json)]
    [%.n p.json]
  --
--
