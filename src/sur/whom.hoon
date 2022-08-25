|%
+$  contact
  $:  ship=(unit @p)
      info=(map @tas contact-field)
      custom=(map @t @t)
  ==
::
+$  action
  $%  [%add-contact =contact]
      [%del-contact key=(each @p @t)]
      [%edit-contact key=(each @p @t) info=(map @tas (unit contact-field)) custom=(map @t (unit @t))]
  ==
::
+$  update
  $:  urbit-contacts=(map @p contact)
      earth-contacts=(map @t contact)
  ==
::
+$  contact-field-def
  $%  [%first-name @t]
      [%middle-name @t]
      [%last-name @t]
      [%nickname @t]
      [%label @t]
      [%note @t]
      [%dob local-date]
      [%job @t]
      [%email @t]
      [%phone @t]
      [%website @t]
      [%github @t]
      [%twitter @t]
  ==
::
+$  contact-field
  $%  @t
      local-date
  ==
::
+$  local-date
  $:  %date
      year=@ud
      month=@ud
      day=@ud
  ==
::
+$  contacts-raw-0
  $:  urbit-contacts=(map @p contact)
      earth-contacts=(map @t contact)
  ==
::
++  validate-contact
  |=  =contact
  ^-  ?
  =/  info=(list [@tas contact-field])  ~(tap by info.contact)
  (levy info validate-info-field)
::
++  validate-info-field
  |=  field=[@tas contact-field]
  ?:  ?=(contact-field-def field)  %.y
  ~&  >>>  "Invalid info field: {<field>}"  %.n
--
