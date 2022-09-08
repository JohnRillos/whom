/-  *whom
|%
++  dejs
  =,  dejs:format
  |%
  ++  action
    ^-  $-(json ^action)
    %-  of
    :~  [%add-contact (ot contact+dj-contact ~)]
        [%del-contact (ot key+dj-contact-key ~)]
        [%edit-contact (ot key+dj-contact-key info+(op sym (mu dj-info-value)) ~)]
        [%add-custom-field (ot key+(se %tas) def+dj-field-def ~)]
    ==
  ++  opt  :: handle missing keys / null values
    |*  [=fist]
    |=  [ujon=(unit json)]
    ?~  ujon  ~
    ?~  u.ujon  ~
    `(fist u.ujon)
  ++  dj-contact
    %-  ou
    :~  ship+(opt (se %p))
        info+(un (op sym dj-info-value))
    ==
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
      (so json)
    ?.  ?=([%o *] json)  !!
    %-  %-  of
        :~  [%date (ot year+ni month+ni day+ni ~)]
        ==
    json
  ::
  ++  dj-field-def  (ot name+so type+dj-field-tag custom+bo ~)
  ::
  ++  dj-field-tag
    |=  =json
    =/  =term  ((se %tas) json)
    ?:  ?=(field-type-tag term)  term
    ~|  "Invalid field type: {<term>}"  !!
  ::
  ++  dj-yes
    |=  =json
    &
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
  ++  contacts-0
    |=  con=^contacts-0
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
    :~  ship+(enjs-unit-patp ship.contact)
        info+(enjs-info info.contact)
    ==
  ::
  ++  enjs-unit-patp
    |=  patp=(unit @p)
    ^-  json
    ?~  patp  ~
    [%s (crip <u.patp>)]
  ::
  ++  enjs-info
    |=  info=(map @tas info-field)
    ^-  json
    %-  pairs:enjs:format
    (turn ~(tap by info) enjs-info-field)
  ::
  ++  enjs-info-field
    |=  [key=@tas val=info-field]
    ^-  [@t json]
    :-  key
    ?-  val
      @t          [%s val]
      info-date  (enjs-date val)
    ==
  ::
  ++  enjs-date
    |=  date=info-date
    %-  pairs
    :~  :-  %date
        %-  pairs
        :~  year+(numb year.date)
            month+(numb month.date)
            day+(numb day.date)
        ==
    ==
  ::
  ++  enjs-fields-0
    |=  fields=(list [key=@tas field-def])
    a+(turn fields enjs-field-def)
  ::
  ++  enjs-field-def
    |=  [key=@tas name=@t type=@tas custom=?]
    %-  pairs
    :~  key+s+key
        name+s+name
        type+s+type
        custom+b+custom
    ==
  --
--
