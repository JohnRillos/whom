/-  *whom
=,  enjs:format
|%
::
++  enjs-contacts-0
  |=  contacts=(map (each @p @t) contact-0)
  ^-  json
  %-  pairs
  %+  turn   ~(tap by contacts)
  |=  [key=(each @p @t) =contact-0]
  ^-  [@tas json]
  :-  (enjs-key key)
  (enjs-contact-0 contact-0)
::
++  enjs-contacts-1
  |=  contacts=(map (each @p @t) contact-1)
  (enjs-contacts-2 contacts)
::
++  enjs-contacts-2
  |=  contacts=(map (each @p @t) contact-2)
  ^-  json
  %-  pairs
  %+  turn   ~(tap by contacts)
  |=  [key=(each @p @t) =contact-2]
  ^-  [@tas json]
  :-  (enjs-key key)
  (enjs-contact-2 contact-2)
::
++  enjs-key
  |=  key=(each @p @t)
  ^-  @tas
  ?-  -.key
    %.y  (crip <p.key>)
    %.n  p.key
  ==
::
++  enjs-contact-0
  |=  contact=contact-0
  ^-  json
  %-  pairs
  :~  info+(enjs-info info.contact)
      profile+(enjs-unit-profile-0 profile.contact)
  ==
::
++  enjs-contact-1
  |=  contact=contact-1
  ^-  json
  %-  pairs
  :~  info+(enjs-info info.contact)
      profile+(enjs-unit-profile-1 profile.contact)
  ==
::
++  enjs-contact-2
  |=  contact=contact-2
  ^-  json
  %-  pairs
  :~  info+(enjs-info info.contact)
      profile+(enjs-unit-profile-2 profile.contact)
  ==
::
++  enjs-unit-patp
  |=  patp=(unit @p)
  ^-  json
  ?~  patp  ~
  [%s (crip <u.patp>)]
::
++  enjs-info
  |=  info=(map @tas info-field-1)
  ^-  json
  %-  pairs
  %+  turn  ~(tap by info)
  |=  [key=@tas =info-field-1]
  [key (enjs-info-field info-field-1)]
::
++  enjs-info-field
  |=  val=info-field-1
  ^-  json
  ?-  val
    [%text *]         [%s +.val]
    [%date *]  (enjs-date +.val)
    [%look *]  (enjs-look +.val)
    [%tint *]  (enjs-tint +.val)
    [%coll *]  (enjs-coll +.val)
  ==
::
++  enjs-tint
  |=  hex=@ux
  (frond %tint (enjs-hex hex))
::
++  enjs-hex
  |=  hex=@ux
  ^-  json
  :-  %s
  ^-  @t
  =/  raw  (trip (scot %ux hex))
  =/  num  (slag 2 raw)
  %-  crip
  %-  cuss
  |-
  ?~  match=(find "." num)  num
  $(num (oust [u.match 1] num))
::
++  enjs-coll
  |=  =coll
  ^-  json
  %+  frond  %coll
  :-  %a
  %+  turn  ~(tap in coll)
  |=  [ship=@p slug=@ta]
  %-  pairs
  =/  s=json  [%s (scot %p ship)]
  :~  [%ship [%s (scot %p ship)]]
      [%slug %s slug]
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
++  enjs-look
  |=  atom=@t
  (frond %look [%s atom])
::
++  enjs-fields
  |=  fields=(list [key=@tas name=@t type=@tas])
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
  %-  pairs
  :~  info+(enjs-info info.self)
  ==
::
++  enjs-self-1  
  |=  self=self-1
  (enjs-self-2 ^-(self-2 self))
::
++  enjs-self-2
  |=  self=self-2
  ^-  json
  %-  pairs
  :~  info+(enjs-info-with-access info.self)
  ==
::
++  enjs-info-with-access
  |=  info=(map @tas [info-field-1 access-level])
  ^-  json
  %-  pairs
  %+  turn  ~(tap by info)
  |=  [key=@tas =info-field-1 =access-level]
  :-  key
  %-  pairs
  :~  value+(enjs-info-field info-field-1)
      access+s+access-level
  ==
::
++  enjs-unit-profile-0
  |=  profile=(unit profile-0)
  ^-  json
  ?~  profile  ~
  (enjs-profile-0 u.profile)
::
++  enjs-unit-profile-1
  |=  profile=(unit profile-1)
  ^-  json
  ?~  profile  ~
  (enjs-profile-1 u.profile)
::
++  enjs-unit-profile-2
  |=  profile=(unit profile-2)
  ^-  json
  ?~  profile  ~
  (enjs-profile-2 u.profile)
::
++  enjs-profile-0
  |=  profile=profile-0
  ^-  json
  %-  pairs
  :~  info+(enjs-info info.profile)
      fields+(enjs-field-defs-map fields.profile)
  ==
::
++  enjs-profile-1
  |=  profile=profile-1
  (enjs-profile-2 profile)
::
++  enjs-profile-2
  |=  profile=profile-2
  ^-  json
  %-  pairs
  :~  info+(enjs-info-with-access info.profile)
      fields+(enjs-field-defs-map fields.profile)
  ==
::
++  enjs-field-defs-map
  |=  fields=(map @tas [name=@t type=@tas])
  ^-  json
  %-  pairs
  %+  turn  ~(tap by fields)
  |=  [key=@tas val=[name=@t type=@tas]]
  ^-  [@t json]
  :-  key
  %-  pairs
  :~  name+s+name.val
      type+s+type.val
  ==
::
++  enjs-pals-0
  |=  val=pals-0
  ^-  json
  %-  pairs
  :~  running+b+running.val
      pals+(enjs-pals-map pals.val)
  ==
::
++  enjs-pals-map
  |=  pals=(map @p pal)
  ^-  json
  %-  pairs
  %+  turn  ~(tap by pals)
  |=  [ship=@p =pal]
  ^-  [@t json]
  :-  (crip <ship>)
  %-  pairs
  :~  status+s+status.pal
  ==
--