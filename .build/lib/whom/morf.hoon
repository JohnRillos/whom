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
  :-  info.contact-1
  ?~  profile.contact-1  ~
  `(profile-1-to-0 u.profile.contact-1)
::
++  contacts-1-to-0
  |=  =contacts-1
  ^-  contacts-0
  %-  ~(run by contacts-1)
  contact-1-to-0
::
++  profile-0-to-1
  |=  =profile-0
  ^-  profile-1
  %=  profile-0
    info  %-  ~(run by info.profile-0)
          |=  =info-field
          [info-field %public]
  ==
::
++  profile-1-to-0
  |=  =profile-1
  ^-  profile-0
  %=  profile-1
    info  %-  ~(run by info.profile-1)
          |=  [=info-field *]
          info-field
  ==
--