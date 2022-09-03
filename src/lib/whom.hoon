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
    :~  contacts+(enjs-contacts contacts.upd)
    ==
  ::
  ++  contacts-raw-0
    |=  con=^contacts-raw-0
    (enjs-contacts con)
  ::
  ++  enjs-contacts
    |=  contacts=(map (each @p @t) contact)
    ^-  json
    %-  pairs:enjs:format
    (turn ~(tap by contacts) enjs-contacts-entry)
  ::
  ++  enjs-contacts-entry
    |=  [key=(each @p @t) =contact]
    ^-  [@tas json]
    :-  (enjs-key key)
    (enjs-contact contact)
  ::
  ++  enjs-key
    |=  key=(each @p @t)
    ^-  @tas
    ?-  -.key
      %.y  (crip <p.key>)
      %.n  p.key
    ==
  ::
  ++  enjs-contact
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
