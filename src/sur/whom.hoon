|%
+$  contact
  $:  ship=(unit @p)
      name=(unit tape)
  ==
::
+$  action
  $%  [%add-contact =contact]
      [%del-contact key=(each @p @t)]
  ==
::
+$  update
  $:  urbit-contacts=(map @p contact)
      earth-contacts=(map @t contact)
  ==
::
--
