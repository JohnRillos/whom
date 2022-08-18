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
        [%edit-contact (ot key+contact-key info+(op sym (mu info-value)) custom+(om (mu so)) ~)]
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
::
++  enjs
  =,  enjs:format
  |%
  ++  update
    |=  upd=^update
    ^-  json
    %-  pairs:enjs:format
    :~  urbit-contacts+(urbit-contacts urbit-contacts.upd)
        earth-contacts+(earth-contacts earth-contacts.upd)
    ==
  ::
  ++  contacts-raw-0
    |=  con=^contacts-raw-0
    ^-  json
    %-  pairs:enjs:format
    :~  urbit-contacts+(urbit-contacts urbit-contacts.con)
        earth-contacts+(earth-contacts earth-contacts.con)
    ==
  ::
  ++  urbit-contacts
    |=  contacts=(map @p contact)
    ^-  json
    %-  pairs:enjs:format
    (turn ~(tap by contacts) urbit-contact)
  ::
  ++  urbit-contact
    |=  [key=@p =contact]
    ^-  [@tas json]
    :-  `@tas`(crip <key>)
    (any-contact contact)
  ::
  ++  earth-contacts
    |=  contacts=(map @t contact)
    ^-  json
    %-  pairs:enjs:format
    (turn ~(tap by contacts) earth-contact)
  ::
  ++  earth-contact
    |=  [key=@t =contact]
    ^-  [@tas json]
    :-  `@tas`key
    (any-contact contact)
  ::
  ++  any-contact
    |=  =contact
    ^-  json
    %-  pairs:enjs:format
    :~  ship+(unit-patp ship.contact)
        info+(contact-info info.contact)
        custom+(custom-info custom.contact)
    ==
  ::
  ++  unit-patp
    |=  patp=(unit @p)
    ^-  json
    ?~  patp  ~
    [%s (crip <u.patp>)]
  ::
  ++  contact-info
    |=  info=(map @tas contact-field)
    ^-  json
    %-  pairs:enjs:format
    (turn ~(tap by info) info-field)
  ::
  ++  info-field
    |=  [key=@tas val=contact-field]
    ^-  [@t json]
    :-  key
    ?-  val
      @t          [%s val]
      local-date  (l-date val)
    ==
  ::
  ++  custom-info
    |=  info=(map @t @t)
    ^-  json
    %-  pairs:enjs:format
    (turn ~(tap by info) custom-field)
  ::
  ++  custom-field
    |=  [key=@t val=@t]
    ^-  [@t json]
    [key [%s val]]
  ::
  ++  l-date
    |=  date=local-date
    %-  pairs
    :~  :-  %date
        %-  pairs
        :~  year+(numb year.date)
            month+(numb month.date)
            day+(numb day.date)
        ==
    ==
  --
--
