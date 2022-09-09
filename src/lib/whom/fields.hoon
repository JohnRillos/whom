/-  *whom
|%
::
++  field-util
  |_  custom-map=(map @tas field-def)
  ::
  ++  field-map
    ^-  (map @tas field-def)
    (~(uni by canon-map) custom-map)
  ::
  ++  field-list
    ^-  (list [@tas field-def])
    (weld canon-list custom-list)
  ::
  ++  canon-map
    (~(gas by *(map @tas field-def)) canon-list)
  ::
  ++  canon-list
    ^-  (list [key=@tas field-def])
    :~  :^  %first-name   'First Name'     %text  |
        :^  %middle-name  'Middle Name'    %text  |
        :^  %last-name    'Last Name'      %text  |
        :^  %nickname     'Nickname'       %text  |
        :^  %label        'Label'          %text  |
        :^  %note         'Note'           %text  |
        :^  %dob          'Date of Birth'  %date  |
        :^  %job          'Occupation'     %text  |
        :^  %email        'Email'          %text  |
        :^  %phone        'Phone #'        %text  |
        :^  %website      'Website'        %text  |
        :^  %github       'Github'         %text  |
        :^  %twitter      'Twitter'        %text  |
    ==
  ::
  ++  custom-list
    (sort ~(tap by custom-map) sort-by-name)
  ::
  ++  sort-by-name
    |=  [a=[@tas def=field-def] b=[@tas def=field-def]]
    (aor name.def.a name.def.b)
  ::
  ++  is-valid
    |=  [key=@tas val=info-field]
    =/  def=(unit field-def)  (~(get by field-map) key)
    ?~  def  %.n
    =(type.u.def -.val)
  --
--
