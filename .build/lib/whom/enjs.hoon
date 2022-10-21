/-  *whom
=,  enjs:format
|%
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
  :~  info+(enjs-info info.contact)
      profile+(enjs-unit-profile profile.contact)
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
    [%text *]         [%s +.val]
    [%date *]  (enjs-date +.val)
  ==
::
++  enjs-date
  |=  atom=@da
  =/  =date  (yore atom)
  %-  pairs
  :~  :-  %date
      %-  pairs
      :~  year+(numb y.date)
          month+(numb m.date)
          day+(numb d.t.date)
      ==
  ==
::
++  enjs-fields-0
  |=  fields=(list [key=@tas field-def])
  a+(turn fields enjs-field-def)
::
++  enjs-field-def
  |=  [key=@tas name=@t type=@tas]
  %-  pairs
  :~  key+s+key
      name+s+name
      type+s+type
  ==
::
++  enjs-self-0
  |=  self=self-0
  ^-  json
  %-  pairs:enjs:format
  :~  info+(enjs-info info.self)
  ==
::
++  enjs-unit-profile
  |=  profile=(unit profile)
  ^-  json
  ?~  profile  ~
  (enjs-profile-0 u.profile)
::
++  enjs-profile-0
  |=  =profile
  ^-  json
  %-  pairs:enjs:format
  :~  info+(enjs-info info.profile)
      fields+(enjs-field-defs-map fields.profile)
  ==
::
++  enjs-field-defs-map
  |=  fields=(map @tas field-def)
  ^-  json
  %-  pairs:enjs:format
  %+  turn  ~(tap by fields)
  |=  [key=@tas val=field-def]
  ^-  [@t json]
  :-  key
  %-  pairs
  :~  name+s+name.val
      type+s+type.val
  ==
--