/-  *whom
|%
::
++  contact-0-to-1
  |=  =contact-0
  :-  info.contact-0
  ?~  profile.contact-0  ~
  `(profile-0-to-1 u.profile.contact-0)
::
++  contact-1-to-0
  |=  =contact-1
  ^-  contact-0
  :-  info.contact-1
  ?~  profile.contact-1  ~
  `(profile-1-to-0 u.profile.contact-1)
::
++  contact-2-to-1
  |=  =contact-2
  ^-  contact-1
  :_  (bind profile.contact-2 profile-2-to-1)
  %-  my
  %+  murn  ~(tap by info.contact-2)
  |=  [key=@tas field=info-field-1]
  ^-  (unit (pair @tas info-field-0))
  ?.  ?=(info-field-0 field)  ~
  `[key field]
::
++  contacts-1-to-0
  |=  =contacts-1
  ^-  contacts-0
  %-  ~(run by contacts-1)
  contact-1-to-0
::
++  contacts-2-to-1
  |=  =contacts-2
  ^-  contacts-1
  %-  ~(run by contacts-2)
  contact-2-to-1
::
++  contacts-2-to-0
  |=  =contacts-2
  (contacts-1-to-0 (contacts-2-to-1 contacts-2))
::
++  profile-0-to-1
  |=  =profile-0
  ^-  profile-1
  profile-0(info (~(run by info.profile-0) (late %public)))
::
++  profile-1-to-0
  |=  =profile-1
  ^-  profile-0
  profile-1(info (~(run by info.profile-1) head))
::
++  profile-2-to-1
  |=  =profile-2
  ^-  profile-1
  :-  %-  my
      %+  murn  ~(tap by info.profile-2)
      |=  [key=@tas [field=info-field-1 acc=access-level]]
      ^-  (unit (pair @tas [info-field-0 access-level]))
      ?.  ?=(info-field-0 field)  ~
      `[key [field acc]]
  %-  my
  ^-  (list (pair @tas field-def-0))
  %+  murn  ~(tap by fields.profile-2)
  |=  [key=@tas def=field-def-1]
  ?.  ?=(field-def-0 def)  ~
  `[key def]
::
++  profile-2-to-0
  |=  =profile-2
  ^-  profile-0
  (profile-1-to-0 (profile-2-to-1 profile-2))
::
++  profile-fields-1-to-0
  |=  info-1=(map @tas [info-field-1 access-level])
  ^-  (map @tas [info-field-0 access-level])
  %-  my
  %+  murn  ~(tap by info-1)
  |=  [key=@tas [field=info-field-1 acc=access-level]]
  ^-  (unit (pair @tas [info-field-0 access-level]))
  ?.  ?=(info-field-0 field)  ~
  `[key [field acc]]
::
++  fields-1-to-0
  |=  fields-1=(list [@tas field-def-1])
  ^-  (list [@tas field-def-0])
  %+  murn  fields-1
  |=  [key=@tas def=field-def-1]
  ?.  ?=(field-def-0 def)  ~
  `[key def]
::
++  self-2-to-1
  |=  =self-2
  ^-  self-1
  self-2(info (profile-fields-1-to-0 info.self-2))
::
--