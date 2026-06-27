# Structures

## Single Property Modifiers

The following sections specify the valid [**Sprm**](#sprm) values.

For ease of implementation, the **Sprm**s are listed as 16-bit integers
rather than structures. The following formulas specify the relationship
between the 16-bit integer representation and the members of the
**Sprm** structure. The single ampersand (&) represents the bitwise AND
operation; all fractions are rounded down to the previous whole number.

<embed src="media/media/image5.bin" title="Equation for ISPMD"
style="width:1.60417in;height:0.23958in" />

<embed src="media/media/image6.bin" title="Equation for F Spec"
style="width:1.30208in;height:0.39583in" />

<embed src="media/media/image7.bin" title="Equation for SGC"
style="width:1.51042in;height:0.48958in" />

<embed src="media/media/image8.bin" title="Equation for SPRA"
style="width:0.90625in;height:0.44792in" />

### Character Properties

A [**Prl**](#prl) with a **sprm.sgc** of 2 modifies a character
property.

The following table specifies the character property modifiers,
including the valid **sprm** values, their function, and the
corresponding **operand** type and meaning.

<table>
<colgroup>
<col style="width: 22%" />
<col style="width: 8%" />
<col style="width: 68%" />
</colgroup>
<thead>
<tr class="header">
<th>Sprm</th>
<th>ispmd</th>
<th>operand</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>sprmCFRMarkDel</p>
<p>(0x0800)</p></td>
<td>0x00</td>
<td>A <a href="#toggleoperand"><strong>ToggleOperand</strong></a> that
specifies whether the text is formatted as deleted revision mark text,
which is text that was deleted while revision marking was on. By
default, text is not formatted as deleted revision mark text.</td>
</tr>
<tr class="even">
<td><p>sprmCFRMarkIns</p>
<p>(0x0801)</p></td>
<td>0x01</td>
<td>A <strong>ToggleOperand</strong> that specifies whether the text is
formatted as inserted revision mark text, which is text that was
inserted while revision marking was on. By default, text is not
formatted as inserted revision mark text.</td>
</tr>
<tr class="odd">
<td><p>sprmCFFldVanish</p>
<p>(0x0802)</p></td>
<td>0x02</td>
<td>A <strong>ToggleOperand</strong> that specifies whether the field
text is hidden. By default, field text is not hidden.</td>
</tr>
<tr class="even">
<td><p>sprmCPicLocation</p>
<p>(0x6A03)</p></td>
<td>0x03</td>
<td><p>A signed 32-bit integer that specifies either the position in the
<a href="#Section_0218f8a661504695965c9abc8a685b81">Data Stream</a> of a
picture or binary data or the name of an <a
href="#gt_cdff9514-a3fb-4897-941d-4e99193a0096"><strong>OLE
object</strong></a> storage.</p>
<p>Text with sprmCPicLocation applied MUST also have sprmCFSpec applied
with a value of 1. The text range MUST contain only characters from the
special characters specified in sprmCFSpec.</p>
<p>The value of sprmCPicLocation is evaluated for each character in the
text range. The value is evaluated differently depending on the
character code, as shown following:</p>
<p>If the character is U+0001:</p>
<ul>
<li><p>The operand of sprmCPicLocation is a position in the
<strong>DataStream</strong>. If sprmCFData is also present and set to 1,
the value specifies the position of a <a
href="#nilpicfandbindata"><strong>NilPICFAndBinData</strong></a> and
describes binary data; otherwise the value specifies the position of a
<a
href="#picfandofficeartdata"><strong>PICFAndOfficeArtData</strong></a>
and describes a picture.</p></li>
</ul>
<p>If the character is U+0014:</p>
<ul>
<li><p>If sprmCFOle2 is also present and set to "true" and the
associated field does not have grffldEnd.fZombieEmbed set, the operand
of sprmCPicLocation specifies the location of an OLE object storage. If
the file is not encrypted with Office Binary Document RC4 CryptoAPI
Encryption (section <a
href="#Section_55d29d8efd804c2da258ffdb7ed9e236">2.2.6.3</a>), the value
specifies the name of an OLE object storage in the <a
href="#Section_f7983581d1074a1fb5f7f3650e777c04"><strong>ObjectPool</strong></a>
of the document.</p></li>
</ul>
<blockquote>
<p>Specifically, the decimal value is converted to a string, and
prefixed with an underscore. The resultant string MUST be the name of a
valid OLE storage in the <strong>ObjectPool</strong> of the document. If
the file is encrypted with Office Binary Document RC4 CryptoAPI
Encryption, the value specifies an offset in the data stream which
contains an <a href="#fobjh"><strong>FOBJH</strong></a> followed by an
OLE object storage.</p>
<p>When used in this fashion, the text range on which sprmCPicLocation
is applied MUST contain exactly one character.</p>
<p>If sprmCFOle2 is absent or set to "false" or the associated field has
grffldEnd.fZombieEmbed set, sprmCPicLocation is unused and MUST be
ignored.</p>
</blockquote>
<p>If there is another character, sprmCPicLocation MUST be ignored.</p>
<p>sprmCPicLocation MUST be present for characters that indicate a
picture, binary data, or OLE object storage.</p></td>
</tr>
<tr class="odd">
<td><p>sprmCIbstRMark</p>
<p>(0x4804)</p></td>
<td>0x04</td>
<td>A signed 16-bit integer that specifies a zero-based index into <a
href="#sttbfrmark"><strong>SttbfRMark</strong></a>. This value MUST be
greater than or equal to zero and MUST be less than
<strong>SttbfRMark.cData</strong>. The string at this index is the name
of the author who inserted the text. This is only recorded if revision
marking is on at the time of the insertion. By default, this index is
zero, which is the index of the "unknown" author.</td>
</tr>
<tr class="even">
<td><p>sprmCDttmRMark</p>
<p>(0x6805)</p></td>
<td>0x05</td>
<td>A <a href="#dttm"><strong>DTTM</strong></a> that specifies the date
and time at which the text was inserted. This is recorded only if
revision marking is on at the time of the insertion. By default, all
fields of this <strong>DTTM</strong> are zero.</td>
</tr>
<tr class="odd">
<td><p>sprmCFData</p>
<p>(0x0806)</p></td>
<td>0x06</td>
<td>A <a href="#bool8"><strong>Bool8</strong></a> that specifies whether
the picture character in the text represents binary data. If set to
<strong>true</strong>, the text range MUST contain exactly 1 character
that is the picture character (U+0001) and sprmCPicLocation MUST be
present to specify the location of the binary data. By default, a
picture character specifies a picture and does not specify binary
data.</td>
</tr>
<tr class="even">
<td><p>sprmCIdslRMark</p>
<p>(0x4807)</p></td>
<td>0x07</td>
<td><p>An unsigned 16-bit integer that specifies the reason value of the
inserted or modified revision mark text. This is recorded only if
revision marking is on at the time of the text insertion or
modification. MUST be one of the values shown following.</p>
<blockquote>
<p>0x0000 - Performed a normal edit</p>
<p>0x0001 - Applied a style</p>
<p>0x0002 - Adjusted alignment with a tab</p>
<p>0x0003 - Adjusted alignment with a tab</p>
<p>0x0004 - Removed extra paragraph mark</p>
<p>0x0005 - Replaced all caps with mixed caps</p>
<p>0x0006 - Replaced bullet character with bullet symbol</p>
<p>0x0007 - Replaced straight quote with smart quote</p>
<p>0x0008 - Replaced multiple-character symbol with single symbol</p>
<p>0x0009 - Replaced text with trademark symbol</p>
<p>0x000A - Replaced text with copyright symbol</p>
<p>0x000B - Replaced text with registered trademark symbol</p>
<p>0x000C - Adjusted spaces after period</p>
<p>0x000D - Replaced numbers with fraction symbol</p>
<p>0x000E - Applied a heading style</p>
<p>0x000F - Applied an outline style</p>
<p>0x0010 - Applied a list style</p>
<p>0x0011 - Applied a memo header style</p>
<p>0x0012 - Applied an address style</p>
<p>0x0013 - Applied a salutation style</p>
<p>0x0014 - Applied a closing phrase style</p>
<p>0x0015 - Applied a date style</p>
<p>0x0016 - Applied a distribution list style</p>
<p>0x0017 - Applied a bullet list style</p>
<p>0x0018 - Applied a column style</p>
<p>0x0019 - Applied a carbon copy style</p>
<p>0x001A - Replaced text with superscript</p>
<p>0x001B - Replaced whitespace galley with tabs</p>
<p>0x001C - Removed leading whitespace</p>
<p>0x001D - Removed manual numbering</p>
<p>0x001E - Replaced two hyphens with long (em) dash</p>
<p>0x001F - Adjusted spaces before: '!', '?', or ';'</p>
<p>0x0020 - Inserted paragraph mark</p>
<p>0x0021 - Replaced leading whitespace to first line indent</p>
<p>0x0022 - Removed a space from between a double byte character and a
single byte character</p>
<p>0x0023 - Replaced to match to open parenthesis</p>
<p>0x0024 - Replaced double byte to single byte</p>
<p>0x0025 - Replaced single byte to double byte</p>
<p>0x0026 - Replaced manual emphasis</p>
<p>0x0027 - Replaced border characters with borders</p>
<p>0x0028 - Replaced e-mail history characters with indentation</p>
<p>0x0029 - Replaced URL or UNC with hyperlink</p>
<p>0x002A - Replaced Gateway-generated hex characters</p>
<p>0x002B - Applied outline level for document map</p>
</blockquote>
<p>By default, the reason value of text that is revision-marked is
zero.</p></td>
</tr>
<tr class="odd">
<td><p>sprmCSymbol</p>
<p>(0x6A09)</p></td>
<td>0x09</td>
<td>A <a href="#csymboloperand"><strong>CSymbolOperand</strong></a>
structure that designates the character as a symbol and specifies the
font and character code for the symbol. By default, characters are not
symbols.</td>
</tr>
<tr class="even">
<td><p>sprmCFOle2</p>
<p>(0x080A)</p></td>
<td>0x0A</td>
<td>A <strong>Bool8</strong> value that specifies whether the character
is a placeholder for an OLE object. When <strong>sprmCFOle2</strong> is
<strong>true</strong>, sprmCFObj MUST also be <strong>true</strong>, and
sprmCPicLocation MUST also be set with the OLE storage name. The
character representing the OLE object MUST be the field separator
(U+00014) of an <a href="#flt"><strong>EMBED</strong></a> field (0x3A),
<strong>LINK</strong> field (0x38), or <strong>CONTROL</strong> field
(0x57). By default, characters are not placeholders for OLE
objects.</td>
</tr>
<tr class="odd">
<td><p>sprmCHighlight</p>
<p>(0x2A0C)</p></td>
<td>0x0C</td>
<td>An <a href="#ico">Ico</a> value that specifies the highlighting
color of the text. By default, text is not highlighted.</td>
</tr>
<tr class="even">
<td><p>sprmCFWebHidden</p>
<p>(0x0811)</p></td>
<td>0x11</td>
<td>A ToggleOperand value that specifies whether the text is hidden in
<a href="#gt_2dc808a1-2414-4380-bacf-b1e7504539f2"><strong>Web Layout
view</strong></a> of the document. By default, text is not hidden in Web
Layout view.</td>
</tr>
<tr class="odd">
<td><p>sprmCRsidProp</p>
<p>(0x6815)</p></td>
<td>0x15</td>
<td>An integer value that specifies a revision save ID, as specified in
<a href="https://go.microsoft.com/fwlink/?LinkId=200054">[ECMA-376]</a>
Part 1, Section 17.15.1.70 rsid (Single Session Revision Save ID),
associated with character formatting. If not present, then no revision
save ID is specified for this formatting.</td>
</tr>
<tr class="even">
<td><p>sprmCRsidText</p>
<p>(0x6816)</p></td>
<td>0x16</td>
<td>An integer that specifies a revision save ID, as specified in
[ECMA-376] Part 1, Section 17.15.1.70 rsid (Single Session Revision Save
ID), associated with insertion of text. If not present, then no revision
save ID is specified for this text.</td>
</tr>
<tr class="odd">
<td><p>sprmCRsidRMDel</p>
<p>(0x6817)</p></td>
<td>0x17</td>
<td>An integer that specifies a revision save ID, as specified in
[ECMA-376] Part 1, Section 17.15.1.70 rsid (Single Session Revision Save
ID), associated with tracked deletion of text. If not present, then no
revision save ID is specified for this deletion.</td>
</tr>
<tr class="even">
<td><p>sprmCFSpecVanish</p>
<p>(0x0818)</p></td>
<td>0x18</td>
<td>A <strong>ToggleOperand</strong> that specifies that this line break
does not indicate a line break but serves as a style separator. A style
separator allows one paragraph to consist of parts that have different
paragraph styles. This <a href="#sprm"><strong>Sprm</strong></a> MUST
NOT be applied to any character other than a line break character (<a
href="#gt_c305d0ab-8b94-461a-bd76-13b40cb8c4d8"><strong>Unicode</strong></a>
0x000B). By default, line break characters specify regular line breaks,
and are not used as style separators.</td>
</tr>
<tr class="odd">
<td><p>sprmCFMathPr</p>
<p>(0xC81A)</p></td>
<td>0x1A</td>
<td>A <a href="#mathproperand"><strong>MathPrOperand</strong></a> that
specifies the justification of equations in the paragraph. This
<strong>Sprm</strong> MUST only be applied to paragraph mark characters
or line break characters (Unicode 0x000B). By default, equations are
justified according to the <strong>mthbpjc</strong> member of the <a
href="#dopmth"><strong>DOPMTH</strong></a>. MAY<span
id="Appendix_A_Target_145" class="anchor"></span><a
href="#">&lt;145&gt;</a> be ignored.</td>
</tr>
<tr class="even">
<td><p>sprmCIstd</p>
<p>(0x4A30)</p></td>
<td>0x30</td>
<td><p>An unsigned integer that specifies the <strong>istd</strong> of a
character style to apply.</p>
<p>To apply the <strong>istd</strong>:</p>
<ol type="1">
<li><p>Reset the character properties of the text to match the results
of the paragraph style (in other words, revert any formatting that is
applied on top of the paragraph style).</p></li>
<li><p>Fetch the set of properties from the specified character style.
(For instructions, see <a
href="#Section_4e918665c4da41d8aed5615c2e96c216">Applying
Properties</a>.)</p></li>
<li><p>Apply those properties to the current text.</p></li>
</ol>
<p>During steps 1 and 3, preserve the previous values of the
following:</p>
<ul>
<li><p>Whether the text is formatted as deleted revision mark text (for
example, by sprmCFRMarkDel).</p></li>
<li><p>Whether the text is formatted with <a
href="#gt_91359688-7863-4e88-b507-f57b3dada5ec"><strong>right-to-left</strong></a>
layout (for example, by sprmCFBiDi).</p></li>
<li><p>Whether the text is displayed right-to-left or is in a <a
href="#gt_813d74cf-c620-4c85-be63-c269e9a1cc19"><strong>South Asian
language</strong></a>. (for example, by sprmCFComplexScripts).</p></li>
<li><p>Whether the field text is hidden (for example, by
sprmCFFldVanish).</p></li>
<li><p>Whether the text is formatted as inserted revision mark text (for
example, by sprmCFRMarkIns).</p></li>
<li><p>Whether the text has a special meaning and special display
handling (for example, by sprmCFSpec).</p></li>
<li><p>Whether the text has associated picture data (for example, by
sprmCFData).</p></li>
<li><p>Whether the character is a placeholder for an OLE object (for
example, by sprmCFOle2).</p></li>
<li><p>Whether the text is hidden in Web Layout view (for example, by
sprmCFWebHidden).</p></li>
<li><p>Whether the text is hidden and the image of a shape is displayed
in its place (for example, by sprmCFObj).</p></li>
<li><p>The position in the Data Stream of a picture, or the name of an
<a href="#gt_171744b8-3f44-4198-b7b9-1c0147282d2c"><strong>Object
Linking and Embedding (OLE)</strong></a> stream (for example, by
sprmCPicLocation).</p></li>
<li><p>Whether the text has an associated property revision mark, as
well as its author and date/time (for example, by
sprmCPropRMark).</p></li>
<li><p>Paragraph properties that have been preserved for revision
marking (for example, by sprmCWall).</p></li>
<li><p>The reason value of the inserted or modified revision mark text
(for example, by sprmCIdslRMark).</p></li>
<li><p>Whether the text is a symbol and, if it is, the font and
character code (for example, by sprmCSymbol).</p></li>
<li><p>Any previous operand value of sprmCIdctHint.</p></li>
<li><p>The highlighting color of the text (for example, from
sprmCHighlight).</p></li>
<li><p>Whether the text is hidden from display when hiding arbitrary XML
delimiters (for example, from sprmCFSdtVanish).</p></li>
</ul>
<ul>
<li><p>The type of font substitution that is needed for the associated
text (for example, from sprmCNeedFontFixup).</p></li>
<li><p>The revision save ID that is associated with the insertion of
text (for example, from sprmCRsidText).</p></li>
<li><p>The revision save ID that is associated with character formatting
(for example, from sprmCRsidProp).</p></li>
<li><p>The revision save ID that is associated with the tracked deletion
of text (for example, by sprmCRsidRMDel).</p></li>
<li><p>The names of the authors who inserted the text, (for example, by
sprmCIbstRMark).</p></li>
<li><p>The dates and times at which the text was inserted (for example,
by sprmCDttmRMark).</p></li>
</ul>
<ul>
<li><p>The names of the authors who deleted the text (for example, by
sprmCIbstRMarkDel).</p></li>
<li><p>The dates and times at which the text was deleted (for example,
by sprmCDttmRMarkDel).</p></li>
<li><p>The justification of equations in the paragraph (for example, by
sprmCFMathPr).</p></li>
</ul>
<p>By default, text has the character style specified by
<strong>istd</strong> 0x000A.</p></td>
</tr>
<tr class="odd">
<td><p>sprmCIstdPermute</p>
<p>(0xCA31)</p></td>
<td>0x31</td>
<td><p>An <a href="#sppoperand">SPPOperand</a> value that specifies a
potential application of a different character style
(<strong>istd</strong>).</p>
<p>If the <strong>istd</strong> is not affected, this
<strong>Prl</strong> MUST be ignored.</p>
<p>If the <strong>istd</strong> is affected, the operation of this
<strong>sprm</strong> specifies the new <strong>istd</strong> as
equivalent to sprmCIstd. Note that the character properties of the text
that are not specified by the current character style are reapplied
after applying sprmCIstdPermute.</p>
<p>By default, the character style of the text is unaffected.</p></td>
</tr>
<tr class="even">
<td><p>sprmCPlain</p>
<p>(0x2A33)</p></td>
<td>0x33</td>
<td><p>The operand is an unsigned integer that MUST be 0 and MUST be
ignored.</p>
<p>The presence of this <strong>Sprm</strong> specifies a reset of the
character properties of the text to match that of the underlying <a
href="#gt_fb5b34b6-fc18-48d7-b50f-5c39d5c8bf0b"><strong>paragraph
style</strong></a> (taking <a
href="#gt_b1e1f096-9da0-411f-909a-f69b92c17633"><strong>style</strong></a>
hierarchy into account), while preserving the previous values of
properties in the following list.</p>
<p>To determine the properties of the underlying paragraph style (taking
style hierarchy into account), follow the algorithm in <a
href="#Section_d8b661231a3d4e0694c55ab16e9b6417">Determining Formatting
Properties</a> but stop before applying <a
href="#Section_61b635c32c444155bf17fec281b30c71">Direct Character
Formatting</a>. (In other words, the new values are determined by
evaluating the properties of the text as if no character style or direct
character formatting are applied; see Style Hierarchy in [ECMA-376] Part
1, Section 17.7.2 for further specification.)</p>
<p>The following properties MUST NOT be affected by the application of
sprmCPlain:</p>
<ul>
<li><p>Whether the text is formatted as deleted revision mark text (for
example, by sprmCFRMarkDel).</p></li>
<li><p>Whether the text is formatted with right-to-left layout (for
example, by sprmCFBiDi).</p></li>
<li><p>Whether the text is displayed right-to-left or is in a South
Asian language. (for example, by sprmCFComplexScripts).</p></li>
</ul>
<ul>
<li><p>Whether the field text is hidden (for example, by
sprmCFFldVanish).</p></li>
<li><p>Whether the text is formatted as inserted revision mark text (for
example, by sprmCFRMarkIns).</p></li>
<li><p>Whether the text has a special meaning and special display
handling (for example, by sprmCFSpec).</p></li>
<li><p>Whether the text has associated picture data (for example, by
sprmCFData).</p></li>
<li><p>Whether the character is a placeholder for an OLE object (for
example, by sprmCFOle2).</p></li>
<li><p>Whether the text is hidden in Web Layout view (for example, by
sprmCFWebHidden).</p></li>
<li><p>The names of the authors who inserted the text (for example, by
sprmCIbstRMark).</p></li>
<li><p>The dates and times at which the text was inserted (for example,
by sprmCDttmRMark).</p></li>
<li><p>The names of the authors who deleted the text (for example, by
sprmCIbstRMarkDel).</p></li>
<li><p>The dates and times at which the text was deleted (for example,
by sprmCDttmRMarkDel).</p></li>
<li><p>Whether the text has an associated property revision mark, as
well as its author and date/time (for example, by
sprmCPropRMark).</p></li>
</ul>
<ul>
<li><p>Paragraph properties that have been preserved for revision
marking (for example, by sprmCWall).</p></li>
<li><p>The reason value of the inserted or modified revision mark text
(for example, by sprmCIdslRMark).</p></li>
<li><p>Whether the text is a symbol and, if it is, the font and
character code (for example, by sprmCSymbol).</p></li>
<li><p>The position in the Data Stream of a picture, or the name of an
OLE stream (for example, by sprmCPicLocation).</p></li>
<li><p>Any previous operand value of sprmCIdctHint.</p></li>
<li><p>The highlighting color of the text (for example, by
sprmCHighlight).</p></li>
<li><p>The type of font substitution that is needed for the associated
text (for example, by sprmCNeedFontFixup).</p></li>
<li><p>The revision save ID that is associated with the insertion of
text (for example, by sprmCRsidText).</p></li>
<li><p>The revision save ID that is associated with character formatting
(for example, by sprmCRsidProp).</p></li>
<li><p>The revision save ID that is associated with the tracked deletion
of text (for example, by sprmCRsidRMDel).</p></li>
<li><p>The justification of equations in the paragraph (for example, by
sprmCFMathPr).</p></li>
</ul>
<p>By default, the character properties of the text are not
reset.</p></td>
</tr>
<tr class="odd">
<td><p>sprmCKcd</p>
<p>(0x2A34)</p></td>
<td>0x34</td>
<td><p>A byte that specifies the kind of emphasis to apply to the text.
The operand MUST be one of the following values.</p>
<p>0x00 - No emphasis</p>
<p>0x01 - Solid circle</p>
<p>0x02 - Comma above</p>
<p>0x03 - Circle above</p>
<p>0x04 - Solid circle below</p>
<p>The operands map to Unicode characters as shown following. The <a
href="#gt_12f63b8b-1c85-4855-9ae1-e6b05720bcfc"><strong>East Asian
language</strong></a> of the text is specified by sprmCRgLid1_80 and
sprmCRgLid1. The default East Asian language is Japanese if
sprmCRgLid1_80 or sprmCRgLid1 does not specify Japanese, Korean, Chinese
(Taiwan), or Chinese (China).</p>
<p>If the meaning of the operand is "solid circle", the following
applies:</p>
<ul>
<li><p>In the Japanese language, the Unicode character of 0xFF0E is
positioned above the text.</p></li>
<li><p>In the Korean language, the Unicode character of 0x02D9 is
positioned above the text.</p></li>
<li><p>In the Chinese (Taiwan) language, the Unicode character of 0x2027
is positioned above the text.</p></li>
<li><p>In the Chinese (China) language, the Unicode character of 0xFF0E
is positioned below the text.</p></li>
</ul>
<p>If the meaning of the operand is "comma above", the following
applies:</p>
<ul>
<li><p>In the Japanese language, the Unicode character of 0x3001 is
positioned above the text.</p></li>
<li><p>In the Korean language, the Unicode character of 0x02DA is
positioned above the text.</p></li>
<li><p>In the Chinese (Taiwan) language, the Unicode character of 0x3002
is positioned above the text.</p></li>
</ul>
<ul>
<li><p>In the Chinese (China) language, the Unicode character of 0x3001
is positioned above the text.</p></li>
</ul>
<p>If the meaning of the operand is "circle above", the following
applies:</p>
<ul>
<li><p>In the Japanese language, the Unicode character of 0x02DA is
positioned above the text.</p></li>
<li><p>In the Korean language, the Unicode character of 0x02DA is
positioned above the text.</p></li>
<li><p>In the Chinese (Taiwan) language, the Unicode character of 0x3002
is positioned above the text.</p></li>
</ul>
<ul>
<li><p>In the Chinese (China) language, the Unicode character of 0x02DA
is positioned above the text.</p></li>
</ul>
<p>If the meaning of the operand is "solid circle below", the following
applies:</p>
<ul>
<li><p>In the Japanese language, the Unicode character of 0xFF0E is
positioned below the text.</p></li>
<li><p>In the Korean language, the Unicode character of 0xFF0E is
positioned below the text.</p></li>
<li><p>In the Chinese (Taiwan) language, the Unicode character of 0xFF0E
is positioned below the text.</p></li>
</ul>
<ul>
<li><p>In the Chinese (China) language, the Unicode character of 0xFF0E
is positioned below the text.</p></li>
</ul>
<p>By default, text has no emphasis mark.</p></td>
</tr>
<tr class="even">
<td><p>sprmCFBold</p>
<p>(0x0835)</p></td>
<td>0x35</td>
<td>A <strong>ToggleOperand</strong> value that specifies whether the
text is bold. By default, text is not bold.</td>
</tr>
<tr class="odd">
<td><p>sprmCFItalic</p>
<p>(0x0836)</p></td>
<td>0x36</td>
<td>A <strong>ToggleOperand</strong> value that specifies whether the
text is italicized. By default, text is not italicized.</td>
</tr>
<tr class="even">
<td><p>sprmCFStrike</p>
<p>(0x0837)</p></td>
<td>0x37</td>
<td>A <strong>ToggleOperand</strong> value that specifies whether the
text is formatted with strikethrough. By default, text is not struck
through.</td>
</tr>
<tr class="odd">
<td><p>sprmCFOutline</p>
<p>(0x0838)</p></td>
<td>0x38</td>
<td>A <strong>ToggleOperand</strong> value that specifies whether only
the outline contour of the characters in the text is rendered, with the
inside of each character left empty. By default, text is rendered in
normal solid characters. If <strong>sprmCFEmboss</strong>, or
<strong>sprmCFImprint</strong> is <strong>true</strong>, then
<strong>sprmCFOutline</strong> MUST be <strong>false</strong>.</td>
</tr>
<tr class="even">
<td><p>sprmCFShadow</p>
<p>(0x0839)</p></td>
<td>0x39</td>
<td>A <strong>ToggleOperand</strong> value that specifies whether the
text is formatted with a shadow. By default, text has no shadow. If
<strong>sprmCFEmboss</strong> or <strong>sprmCFImprint</strong> is
<strong>true</strong>, then <strong>sprmCFShadow</strong> MUST be
<strong>false</strong>.</td>
</tr>
<tr class="odd">
<td><p>sprmCFSmallCaps</p>
<p>(0x083A)</p></td>
<td>0x3A</td>
<td>A <strong>ToggleOperand</strong> value that specifies whether the
text characters are displayed as their capital letter equivalents, in a
font size that is smaller than the actual font size that is specified
for this text. It does not affect any nonalphabetic character. By
default, the characters are displayed in their original character
form.</td>
</tr>
<tr class="even">
<td><p>sprmCFCaps</p>
<p>(0x083B)</p></td>
<td>0x3B</td>
<td>A <strong>ToggleOperand</strong> value that specifies whether the
text characters are displayed as their capital letter equivalents. It
does not affect any nonalphabetic character. By default, the characters
are displayed in their original character form.</td>
</tr>
<tr class="odd">
<td><p>sprmCFVanish</p>
<p>(0x083C)</p></td>
<td>0x3C</td>
<td>A <strong>ToggleOperand</strong> value that specifies whether the
text is formatted as hidden. By default, text is not hidden.</td>
</tr>
<tr class="even">
<td><p>sprmCKul</p>
<p>(0x2A3E)</p></td>
<td>0x3E</td>
<td>A <a href="#kul"><strong>Kul</strong></a> value that specifies the
underlining style of the text. By default, text is not underlined.</td>
</tr>
<tr class="odd">
<td><p>sprmCDxaSpace</p>
<p>(0x8840)</p></td>
<td>0x40</td>
<td>An <a href="#xas"><strong>XAS</strong></a> value that specifies the
extra space, in <a
href="#gt_4b82472c-103d-4eff-a07e-6a0f784e3382"><strong>twips</strong></a>,
between a character and the one to its right. This does not vary with
the directionality of the script or layout. Negative values indicate
that space is removed, possibly producing character overlap. Negative
space beyond the character width is ignored. By default, the space to
the right of a character is neither added nor removed.</td>
</tr>
<tr class="even">
<td><p>sprmCIco</p>
<p>(0x2A42)</p></td>
<td>0x42</td>
<td>An Ico value that specifies the color of the text. The default text
color is <strong>cvAuto</strong>.</td>
</tr>
<tr class="odd">
<td><p>sprmCHps</p>
<p>(0x4A43)</p></td>
<td>0x43</td>
<td>An unsigned 2-byte integer that specifies the size of the text,
except for text that meets the qualifications for
<strong>sprmCHpsBi</strong>. This value is specified in half-<a
href="#gt_d072e4da-7898-4227-8f25-9fe77db43571"><strong>points</strong></a>.
The specified value MUST be between 2 and 3276. By default, the font
size is 20 half-points.</td>
</tr>
<tr class="even">
<td><p>sprmCHpsPos</p>
<p>(0x4845)</p></td>
<td>0x45</td>
<td>A signed integer value that specifies the vertical position, in
half-points, of text relative to the normal position. The specified
value MUST be between -3168 and 3168. By default, text is in its normal
vertical position.</td>
</tr>
<tr class="odd">
<td><p>sprmCMajority</p>
<p>(0xCA47)</p></td>
<td>0x47</td>
<td><p>A <a href="#cmajorityoperand">CMajorityOperand</a> value that
specifies which of the character properties of the text to reset to
match the properties of the underlying paragraph style, taking the style
hierarchy into account.</p>
<p>If the character style index (the <strong>istd</strong>) of the text
is not 10 (the default), this <strong>Sprm</strong> MUST be ignored.</p>
<p>sprmCMajority can affect any of the character properties in the
following list. If a character property is affected, that property on
the text is then set to the value of that property in the underlying
paragraph style, taking the style hierarchy into account.</p>
<p>To determine if a given property (from the following list of
potentially affected character properties) is affected, do the
following:</p>
<ol type="1">
<li><p>Find the property value on the text.</p></li>
<li><p>Find the property value as specified in the
<strong>grpprl</strong> member of CMajorityOperand. If the property
value is not specified in the <strong>grpprl</strong> member, use the
default value.</p></li>
<li><p>Compare the two values.</p></li>
<li><p>If the values match, the property is affected.</p></li>
</ol>
<p>After it is determined that a property is affected, see sprmCPlain
for information about how to determine the properties of the underlying
paragraph style.</p>
<p>Note that two special cases occur in the determination of whether a
property is affected:</p>
<ul>
<li><p>In the case of whether the text is excluded from the proofing
analysis (for example, by sprmCFNoProof), if the value of the property
on the text is 1 and the value of the property specified in the
<strong>grpprl</strong> is 1, the property is not affected (it is left
as 1 on the text.) Otherwise the preceding rules apply.</p></li>
<li><p>In the case of the font index that is used only if the language
for the text is an East Asian language (for example, by sprmCRgFtc1), if
the preceding rules would lead to the application of a font index for
this property that specifies the Times New Roman font, the property is
not affected (it is left as before).</p></li>
</ul>
<p>The character properties (potentially) affected are:</p>
<ul>
<li><p>Whether the text is bold (for example, by sprmCFBold)</p></li>
<li><p>Whether the text is italicized (for example, by
sprmCFItalic)</p></li>
<li><p>Whether the text is formatted in smaller capital forms (for
example, by sprmCFSmallCaps)</p></li>
<li><p>Whether the text is formatted as hidden (for example, by
sprmCFVanish)</p></li>
<li><p>Whether the text is bolded when displayed right-to-left (for
example, by sprmCFBoldBi)</p></li>
<li><p>Whether the text is italicized when the text is displayed
right-to-left (for example, by sprmCFItalicBi)</p></li>
<li><p>Whether the text is formatted with a strikethrough effect (for
example, by sprmCFStrike)</p></li>
<li><p>Whether the text is formatted in capital form (for example, by
sprmCFCaps)</p></li>
<li><p>Whether the text is formatted with a shadow effect (for example,
by sprmCFShadow)</p></li>
</ul>
<ul>
<li><p>Whether only the outline contour of the characters in the text is
rendered, with the inside of each character left empty (for example, by
sprmCFOutline)</p></li>
<li><p>Whether the text is formatted with a double strikethrough effect
(for example, by sprmCFDStrike)</p></li>
<li><p>Whether the text is embossed (for example, by
sprmCFEmboss)</p></li>
<li><p>Whether the text is formatted with the imprint style (for
example, by sprmCFImprint)</p></li>
<li><p>Whether the text is excluded from the proofing analysis (for
example, by sprmCFNoProof)</p></li>
<li><p>The font index that is used to display the text only if the
conditions for using these fonts do not apply: sprmCRgFtc1, sprmCRgFtc2
and sprmCFtcBi (for example, by sprmCRgFtc0)</p></li>
<li><p>The font index that is used only if the language for the text is
an East Asian language (for example, by sprmCRgFtc1)</p></li>
<li><p>The font index that is used to display the text if the language
for the text is one of those listed for sprmCRgFtc2 (for example, by
sprmCRgFtc2)</p></li>
<li><p>The font index that is used to display the text only if the text
flow is right-to-left or if the language for the text is a South Asian
language (for example, by sprmCFtcBi)</p></li>
<li><p>The size of the text (for example, by sprmCHps)</p></li>
<li><p>The size of the text, for text that is displayed right-to-left
(for example, by sprmCHpsBi)</p></li>
<li><p>The vertical position of the text relative to the normal position
(for example, by sprmCHpsPos)</p></li>
<li><p>The superscript or subscript for text (for example, by
sprmCIss)</p></li>
<li><p>The kind of emphasis to apply to the text (for example, by
sprmCKcd)</p></li>
<li><p>The underlining style of the text (for example, by
sprmCKul)</p></li>
<li><p>The extra space, in twips, between a character and the one to its
right (for example, by sprmCDxaSpace)</p></li>
<li><p>The color of the text (for example, by sprmCCv)</p></li>
<li><p>The text effect of the text (for example, by
sprmCSfxText)</p></li>
<li><p>The language of the text, except for East Asian languages (for
example, by sprmCRgLid0)</p></li>
<li><p>The language of the text, if it is an East Asian language (for
example, by sprmCRgLid1)</p></li>
<li><p>The language of the text when the text is displayed right-to-left
(for example, by sprmCLidBi)</p></li>
</ul>
<p>Any character property that is not in this list MUST NOT be affected
by sprmCMajority.</p></td>
</tr>
<tr class="even">
<td><p>sprmCIss</p>
<p>(0x2A48)</p></td>
<td>0x48</td>
<td><p>An 8-bit unsigned integer that specifies superscript or subscript
for text. By default, text is normal. The value MUST be one of those
listed following.</p>
<blockquote>
<p>0x00 - Normal text</p>
<p>0x01 - Superscript</p>
<p>0x02 - Subscript</p>
</blockquote></td>
</tr>
<tr class="odd">
<td><p>sprmCHpsKern</p>
<p>(0x484B)</p></td>
<td>0x4B</td>
<td>A signed integer that specifies a font size threshold, in
half-points, at or above which kerning is applied to the text. If the
operand is 0, no kerning is applied; otherwise, it MUST be a value
between 1 and 3276. By default, kerning is not applied to any
characters.</td>
</tr>
<tr class="even">
<td><p>sprmCHresi</p>
<p>(0x484E)</p></td>
<td>0x4E</td>
<td>An <a href="#hresioperand">HresiOperand</a> value that specifies the
word-breaking behavior for the text. By default the text uses normal
hyphenation.</td>
</tr>
<tr class="odd">
<td><p>sprmCRgFtc0</p>
<p>(0x4A4F)</p></td>
<td>0x4F</td>
<td>A 2-byte signed integer value that is an index into the font table
(<a href="#sttbfffn">SttbfFfn</a>). The font that is referenced by this
index is used to display the text only if the conditions for using these
fonts do not apply: sprmCRgFtc1, sprmCRgFtc2 and sprmCFtcBi. This value
MUST be between 0 and a number that is one less than the count of
entries in SttbfFfn unless there are 0 entries, in which case this value
MUST be 0. By default, the font used under these conditions is
<strong>STSH.Stshi.Stshif.ftcAsci</strong>.</td>
</tr>
<tr class="even">
<td><p>sprmCRgFtc1</p>
<p>(0x4A50)</p></td>
<td>0x50</td>
<td>A 2-byte signed integer value that is an index into the font table
(SttbfFfn). The font referenced by this index is used only if the
language for the text is an East Asian language. This value MUST be
between 0 and a number that is one less than the count of entries in
SttbfFfn unless there are 0 entries, in which case this value MUST be 0.
By default, the font that is used under these conditions is
<strong>STSH.Stshi.Stshif.ftcFE</strong>.</td>
</tr>
<tr class="odd">
<td><p>sprmCRgFtc2</p>
<p>(0x4A51)</p></td>
<td>0x51</td>
<td>A 2-byte signed integer that is an index into the font table
(SttbfFfn). The font that is referenced by this index is used to display
text if the character falls outside the Unicode character range U+0020
to U+007F and the conditions for using these fonts do not apply:
sprmCRgFtc1 and sprmCFtcBi. This value MUST be between 0 and a number
that is one less than the count of entries in SttbfFfn unless there are
0 entries, in which case this value MUST be 0. By default, the font that
is used under these conditions is
<strong>STSH.Stshi.Stshif.ftcOther</strong>.</td>
</tr>
<tr class="even">
<td><p>sprmCCharScale</p>
<p>(0x4852)</p></td>
<td>0x52</td>
<td>A 2-byte unsigned integer that specifies the percentage by which to
horizontally scale the text, thereby changing the shape of the
characters. The value MUST be greater than or equal to 1, and less than
or equal to 600. Values that are less than 100 represent the compressing
of text. Values that are greater than 100 represent the expanding of
text. By default, text is neither compressed nor expanded.</td>
</tr>
<tr class="odd">
<td><p>sprmCFDStrike</p>
<p>(0x2A53)</p></td>
<td>0x53</td>
<td>A <strong>ToggleOperand</strong> value that specifies whether the
text is formatted with the double strikethrough effect. By default, text
is not struck through.</td>
</tr>
<tr class="even">
<td><p>sprmCFImprint</p>
<p>(0x0854)</p></td>
<td>0x54</td>
<td>A <strong>ToggleOperand</strong> value that specifies whether the
text is formatted with the imprint effect. By default, text does not
have this formatting applied. If sprmCFEmboss, sprmCFOutline or
sprmCFShadow is "true", then sprmCFImprint MUST be "false".</td>
</tr>
<tr class="odd">
<td><p>sprmCFSpec</p>
<p>(0x0855)</p></td>
<td>0x55</td>
<td><p>A <strong>ToggleOperand</strong> value that specifies whether the
current text has a meaning that differs or displays differently than the
underlying character to which it is applied. This value SHOULD<span
id="Appendix_A_Target_146" class="anchor"></span><a
href="#Appendix_A_146">&lt;146&gt;</a> be applied only to the following
characters.</p>
<blockquote>
<p>U+0001 - A picture location that is used in conjunction with
sprmCPicLocation.</p>
<p>U+0002 - An auto-numbered footnote reference. See plcffndRef.</p>
<p>U+0003 - A short horizontal line.</p>
<p>U+0004 - A long horizontal line that is the width of the content area
of the page.</p>
<p>U+0005 - An annotation reference character. See PlcfandRef.</p>
<p>U+0008 - A drawn object. See plcfSpa.</p>
<p>U+0013 - A field begin character. See Plcfld.</p>
<p>U+0014 - A field separator character. See Plcfld.</p>
<p>U+0015 - A field end character. See Plcfld.</p>
<p>U+0028 - A symbol. See sprmCSymbol.</p>
<p>U+003C - The start of a structured document tag bookmark range. See
FibRgFcLcb2003.fcPlcfBkfSdt.</p>
<p>U+003E - The end of a structured document tag bookmark range. See
FibRgFcLcb2003.fcPlcfBklSdt.</p>
<p>U+2002 - An en space.</p>
<p>U+2003 - An em space.</p>
</blockquote>
<p>By default, characters have no special meaning beyond their
underlying glyph.</p></td>
</tr>
<tr class="even">
<td><p>sprmCFObj</p>
<p>(0x0856)</p></td>
<td>0x56</td>
<td>A <strong>Bool8</strong> value that specifies whether the current
text represents an embedded object. If sprmCFObj is "true", sprmCFOle2
MUST also be "true". By default, text is not an embedded object.</td>
</tr>
<tr class="odd">
<td><p>sprmCPropRMark90</p>
<p>(0xCA57)</p></td>
<td>0x57</td>
<td><p>A <a
href="#proprmarkoperand"><strong>PropRMarkOperand</strong></a> value
that specifies whether the character run has an associated <a
href="#gt_4d5c1e95-df26-408b-a964-4a6cba5d2239"><strong>property
revision mark</strong></a>, as well as its author and date/time.</p>
<p>By default, character runs have no property revision marks.</p></td>
</tr>
<tr class="even">
<td><p>sprmCFEmboss</p>
<p>(0x0858)</p></td>
<td>0x58</td>
<td>A <strong>ToggleOperand</strong> value that specifies whether the
text is embossed. By default, text is not embossed. If sprmCFOutline,
sprmCFShadow or sprmCFImprint is "true", sprmCFEmboss MUST be
"false".</td>
</tr>
<tr class="odd">
<td><p>sprmCSfxText</p>
<p>(0x2859)</p></td>
<td>0x59</td>
<td><p>A byte that specifies a text effect to apply to the text. By
default, text does not have any text effects. The allowed values and
their meanings are listed following.</p>
<blockquote>
<p>0x0 - None.</p>
<p>0x1 - Las Vegas Lights. Text is bordered by marquee lights that blink
between the colors red, yellow, green, and blue.</p>
<p>0x2 - Blinking background. Text has a black background that blinks on
and off.</p>
<p>0x3 - Sparkle Text. Text is overlaid with multicolored stars that
blink on and off at regular intervals.</p>
<p>0x4 - Marching Black Ants. Text is surrounded by a black dashed-line
border. The border is animated so that the individual dashes appear to
move clockwise around the text.</p>
<p>0x5 - Marching Red Ants. Text is surrounded by a red dashed-line
border that is animated to appear to move clockwise around the text.</p>
<p>0x6 - Shimmer. Text is alternately blurred and unblurred at regular
intervals, to give the appearance of shimmering.</p>
</blockquote></td>
</tr>
<tr class="even">
<td><p>sprmCFBiDi</p>
<p>(0x085A)</p></td>
<td>0x5A</td>
<td>A <strong>ToggleOperand</strong> value that specifies whether the
text is formatted with right-to-left layout. By default, text is
displayed from right to left if the language for the text is a
right-to-left language.</td>
</tr>
<tr class="odd">
<td><p>sprmCFBoldBi</p>
<p>(0x085C)</p></td>
<td>0x5C</td>
<td>A <strong>ToggleOperand</strong> value that specifies whether the
text is formatted bold when displayed right-to-left or determined to be
complex script. By default, text is not bold.</td>
</tr>
<tr class="even">
<td><p>sprmCFItalicBi</p>
<p>(0x085D)</p></td>
<td>0x5D</td>
<td>A <strong>ToggleOperand</strong> value that specifies whether the
text is italicized when displayed right-to-left or determined to be
complex script. By default, text is not italicized.</td>
</tr>
<tr class="odd">
<td><p>sprmCFtcBi</p>
<p>(0x4A5E)</p></td>
<td>0x5E</td>
<td>A 2-byte signed index into the font table
(<strong>SttbfFfn</strong>). The font that is referenced by this index
is used to display the text only if the text flow is right-to-left or if
the text is a complex script. This value MUST be a number that is
between 0 and one less than the count of entries in
<strong>SttbfFfn</strong> unless there are 0 entries, in which case this
value MUST be 0. By default, the font used under these conditions is
<strong>STSH.Stshi.ftcBi</strong>.</td>
</tr>
<tr class="even">
<td><p>sprmCLidBi</p>
<p>(0x485F)</p></td>
<td>0x5F</td>
<td>A <a href="#lid"><strong>LID</strong></a> value that specifies the
language of the text when the text is displayed right-to-left or if the
text is complex script. By default, text language is undefined and text
is not checked for spelling, grammar, or hyphenation.</td>
</tr>
<tr class="odd">
<td><p>sprmCIcoBi</p>
<p>(0x4A60)</p></td>
<td>0x60</td>
<td>An <strong>ICO</strong> value that specifies the color of text when
displayed right-to-left or determined to be complex script.<span
id="Appendix_A_Target_147" class="anchor"></span><a
href="#Appendix_A_147">&lt;147&gt;</a></td>
</tr>
<tr class="even">
<td><p>sprmCHpsBi</p>
<p>(0x4A61)</p></td>
<td>0x61</td>
<td><p>An unsigned 2-byte integer value that specifies the size of the
text, for text that is displayed right-to-left or text that is a complex
script. This value is specified in half-points. The specified value MUST
be between 0 and 3276. By default, text of the following Unicode
subranges uses the associated size, in half points, as specified in <a
href="%5bMC-USB%5d.pdf">[MC-USB]</a>.</p>
<ul>
<li><p>Thai, Mongolian, and Bangla use a font size of 28.</p></li>
<li><p>Tibetan uses a font size of 32.</p></li>
<li><p>Devanagari uses a font size of 20.</p></li>
<li><p>Khmer uses a font size of 36.</p></li>
</ul>
<p>Text of other Unicode subranges uses a font size of 24 half
points.</p></td>
</tr>
<tr class="odd">
<td><p>sprmCDispFldRMark</p>
<p>(0xCA62)</p></td>
<td>0x62</td>
<td>A <a href="#dispfldrmoperand"><strong>DispFldRmOperand</strong></a>
value that indicates a revision within the result of a display field.
This sprm MUST be applied only to a LISTNUM display field.</td>
</tr>
<tr class="even">
<td><p>sprmCIbstRMarkDel</p>
<p>(0x4863)</p></td>
<td>0x63</td>
<td>A signed 16-bit integer value that specifies a zero-based index into
<strong>SttbfRMark</strong>. This value MUST be greater than or equal to
zero and MUST be less than <strong>SttbfRMark.cData</strong>. The string
at this index is the name of the author who deleted the text. This is
recorded only if revision marking is on at the time of deletion. By
default, this index is zero, which is the index of the "Unknown"
author.</td>
</tr>
<tr class="odd">
<td><p>sprmCDttmRMarkDel</p>
<p>(0x6864)</p></td>
<td>0x64</td>
<td>A <strong>DTTM</strong> value that specifies the date and time at
which the text was deleted. This is recorded only if revision marking is
on at the time of the deletion. By default, the date is 1/1/1900 and the
time is 00:00:00.</td>
</tr>
<tr class="even">
<td><p>sprmCBrc80</p>
<p>(0x6865)</p></td>
<td>0x65</td>
<td><p>A <a href="#brc80"><strong>Brc80</strong></a> value that
specifies the border of all four sides of the text. The <a
href="#gt_ccc2ab6c-db9b-4c67-9b95-21ce79e7358d"><strong>logical
left</strong></a> border is hidden if the previous character on the same
line has the same border as this character. The <a
href="#gt_ef86cf61-a2e3-4130-abc4-9e92dae5a2a7"><strong>logical
right</strong></a> border is hidden if the next character on the same
line has the same border as this character. By default, text has no
border.</p>
<p><strong>Brc80.dptSpace</strong> MUST be ignored when applied to
character borders.</p></td>
</tr>
<tr class="odd">
<td><p>sprmCShd80</p>
<p>(0x4866)</p></td>
<td>0x66</td>
<td>A <a href="#shd80"><strong>Shd80</strong></a> structure that
specifies the background shading for the text. By default, text is not
shaded.</td>
</tr>
<tr class="even">
<td><p>sprmCIdslRMarkDel</p>
<p>(0x4867)</p></td>
<td>0x67</td>
<td><p>An unsigned 16-bit integer that specifies the reason why the text
under revision was deleted. This is recorded only if revision marking is
on at the time when the text is edited. This value MUST be one of the
following.</p>
<p>0x0000 – Performed a normal edit.</p>
<p>0x0001 – Applied a style.</p>
<p>0x0002 – Adjusted alignment with a tab.</p>
<p>0x0003 – Adjusted alignment with a tab.</p>
<p>0x0004 – Removed extra paragraph mark.</p>
<p>0x0005 – Replaced all caps with mixed caps.</p>
<p>0x0006 – Replaced bullet character with bullet symbol.</p>
<p>0x0007 – Replaced straight quote with smart quote.</p>
<p>0x0008 – Replaced multiple-character symbol with single symbol.</p>
<p>0x0009 – Replaced text with trademark symbol.</p>
<p>0x000A – Replaced text with copyright symbol.</p>
<p>0x000B – Replaced text with registered trademark symbol.</p>
<p>0x000C – Adjusted spaces after period.</p>
<p>0x000D – Replaced numbers with fraction symbol.</p>
<p>0x000E – Applied a heading style.</p>
<p>0x000F – Applied an outline style.</p>
<p>0x0010 – Applied a list style.</p>
<p>0x0011 – Applied a memo header style.</p>
<p>0x0012 – Applied an address style.</p>
<p>0x0013 – Applied a salutation style.</p>
<p>0x0014 – Applied a closing phrase style.</p>
<p>0x0015 – Applied a date style.</p>
<p>0x0016 – Applied a distribution list style.</p>
<p>0x0017 – Applied a bullet list style.</p>
<p>0x0018 – Applied a column style.</p>
<p>0x0019 – Applied a carbon copy style.</p>
<p>0x001A – Replaced text with superscript.</p>
<p>0x001B – Replaced whitespace galley with tabs.</p>
<p>0x001C – Removed leading whitespace.</p>
<p>0x001D – Removed manual numbering.</p>
<p>0x001E – Replaced two hyphens with long (em) dash.</p>
<p>0x001F – Adjusted spaces before: ‘!’, ‘?’, or ‘;’</p>
<p>0x0020 – Inserted paragraph mark.</p>
<p>0x0021 – Replaced leading whitespace to first line indent.</p>
<p>0x0022 – Removed space between a double byte character and a single
byte character.</p>
<p>0x0023 – Replaced to match to open parenthesis.</p>
<p>0x0024 – Replaced double byte to single byte.</p>
<p>0x0025 – Replaced single byte to double byte.</p>
<p>0x0026 – Replaced manual emphasis.</p>
<p>0x0027 – Replaced border characters with borders</p>
<p>0x0028 – Replaced e-mail history characters with indentation.</p>
<p>0x0029 – Replaced URL or UNC with hyperlink.</p>
<p>0x002A – Replaced Gateway-generated hex characters.</p>
<p>0x002B – Applied outline level for document map.</p>
<p>By default, the reason for the revision is "Performed a normal
edit."</p></td>
</tr>
<tr class="odd">
<td><p>sprmCFUsePgsuSettings</p>
<p>(0x0868)</p></td>
<td>0x68</td>
<td>A <strong>ToggleOperand</strong> value that specifies whether the
text is to be displayed according to the <a
href="#gt_f1f5f018-eebc-4631-9036-ed857713c71c"><strong>document
grid</strong></a>. By default, text uses the document grid if one is
defined. (See <a href="#section-properties">sprmSClm</a> for more
details about the document grid.)</td>
</tr>
<tr class="even">
<td><p>sprmCRgLid0_80</p>
<p>(0x486D)</p></td>
<td>0x6D</td>
<td>A <strong>LID</strong> value that specifies the language of the
text, except for East Asian languages. East Asian languages are
specified by sprmCRgLid1_80. By default, the text language is
undefined.</td>
</tr>
<tr class="odd">
<td><p>sprmCRgLid1_80</p>
<p>(0x486E)</p></td>
<td>0x6E</td>
<td>A <strong>LID</strong> value that specifies the language of the text
if it is an East Asian language. Other languages are specified by
sprmCRgLid0_80. By default, the text language is undefined.</td>
</tr>
<tr class="even">
<td><p>sprmCIdctHint</p>
<p>(0x286F)</p></td>
<td>0x6F</td>
<td><p>An 8-bit unsigned integer value that specifies which of the
language, font, size, bold, and italic properties is to be used for
handling the text, in the case where this cannot be derived from the
characters themselves. The valid values and their meanings are specified
as follows. These meanings correspond to the values of the ST_Hint type
specified in [ECMA-376] Part 1, Section 17.18.41.</p>
<blockquote>
<p><strong>0x00 - default</strong></p>
<p>Use sprmCRgLid0 (or sprmCRgLid0_80) for language. Use sprmCRgFtc0 for
font if the character is between 0x0020 and 0x007F, inclusive.
Otherwise, use sprmCRgFtc2. Use sprmCHps for size, sprmCFBold for bold,
and sprmCFItalic for italic.</p>
<p><strong>0x01 - eastAsia</strong></p>
<p>Use sprmCRgLid1 (or sprmCRgLid1_80) for language, sprmCRgFtc1 for
font, sprmCHps for size, sprmCFBold for bold, and sprmCFItalic for
italic.</p>
<p><strong>0x02 - cs</strong></p>
<p>Use sprmCLidBi for language, sprmCFtcBi for font, sprmCHpsBi for
size, sprmCFBoldBi for bold, and sprmCFItalicBi for italic.</p>
<p><strong>0xFF - No ST_Hint equivalent</strong></p>
<p>Provides no guidance on how to treat ambiguous text.</p>
</blockquote></td>
</tr>
<tr class="odd">
<td><p>sprmCCv</p>
<p>(0x6870)</p></td>
<td>0x70</td>
<td>A <a href="#colorref"><strong>COLORREF</strong></a> value that
specifies the color of the text. The default text color is
<strong>cvAuto</strong>.</td>
</tr>
<tr class="even">
<td><p>sprmCShd</p>
<p>(0xCA71)</p></td>
<td>0x71</td>
<td>A <a href="#shdoperand"><strong>SHDOperand</strong></a> value that
specifies the background shading for the text. By default, text is not
shaded.</td>
</tr>
<tr class="odd">
<td><p>sprmCBrc</p>
<p>(0xCA72)</p></td>
<td>0x72</td>
<td><p>A <a href="#brcoperand"><strong>BrcOperand</strong></a> value
that specifies the border on all four sides of the text. The logical
left border is hidden if the previous character on the same line has the
same border as this character. The logical right border is hidden if the
next character on the same line has the same border as this character.
By default, text has no border.</p>
<p><strong><a href="#brc">Brc</a>.dptSpace</strong> MUST be ignored when
applied to character borders.</p></td>
</tr>
<tr class="even">
<td><p>sprmCRgLid0</p>
<p>(0x4873)</p></td>
<td>0x73</td>
<td>A <strong>LID</strong> value that specifies the language of the
text, except for East Asian languages. East Asian languages are
specified by sprmCRgLid1. By default, the text language is undefined and
text is not checked for spelling, grammar, or hyphenation.</td>
</tr>
<tr class="odd">
<td><p>sprmCRgLid1</p>
<p>(0x4874)</p></td>
<td>0x74</td>
<td>A <strong>LID</strong> value that specifies the language of the text
if it is an East Asian language. Other languages are specified by the
sprmCRgLid0. By default, the text language is undefined and text is not
checked for spelling, grammar, or hyphenation.</td>
</tr>
<tr class="even">
<td><p>sprmCFNoProof</p>
<p>(0x0875)</p></td>
<td>0x75</td>
<td>A <strong>ToggleOperand</strong> value that specifies whether the
text is excluded from the proofing analysis. By default, text is not
excluded from the proofing analysis.</td>
</tr>
<tr class="odd">
<td><p>sprmCFitText</p>
<p>(0xCA76)</p></td>
<td>0x76</td>
<td>A <a href="#cfittextoperand"><strong>CFitTextOperand</strong></a>
value that specifies a width, in twips, to which text is expanded or
condensed to fit. By default, text is not modified to fit into a
specific width.</td>
</tr>
<tr class="even">
<td><p>sprmCCvUl</p>
<p>(0x6877)</p></td>
<td>0x77</td>
<td>A <strong>COLORREF</strong> value that specifies the color of the
text underline. The default underline color is
<strong>cvAuto</strong>.</td>
</tr>
<tr class="odd">
<td><p>sprmCFELayout</p>
<p>(0xCA78)</p></td>
<td>0x78</td>
<td>A <a
href="#fareastlayoutoperand"><strong>FarEastLayoutOperand</strong></a>
value that specifies text layout information for East Asian languages.
By default, text layout is unchanged by the
<strong>sprmCFELayout</strong> value.</td>
</tr>
<tr class="even">
<td><p>sprmCLbcCRJ</p>
<p>(0x2879)</p></td>
<td>0x79</td>
<td>An <a href="#lbcoperand"><strong>LBCOperand</strong></a> value that
specifies that this character is a special character representing a line
break of the given type. The presence of a line break character means
that the line ends at this point and that the rest of the text continues
on another line even though it is part of the same paragraph. This
<strong>Sprm</strong> MUST NOT be applied to any character other than a
line break character (Unicode 0x000B). By default, text restarts at the
beginning of the next line after a line break character.</td>
</tr>
<tr class="odd">
<td><p>sprmCFComplexScripts</p>
<p>(0x0882)</p></td>
<td>0x82</td>
<td><p>A <strong>ToggleOperand</strong> value that specifies whether
complex script formatting (for example, see sprmCFBoldBi) is applied to
the text regardless of the Unicode characters themselves.</p>
<p>By default, characters are evaluated to determine whether complex
script formatting is applied.</p></td>
</tr>
<tr class="even">
<td><p>sprmCWall</p>
<p>(0x2A83)</p></td>
<td>0x83</td>
<td><p>A <strong>Bool8</strong> value that specifies whether the values
of character properties are preserved for revision-marking purposes
until the modifications are accepted or rejected by the user.</p>
<p>A value of 1 specifies that the values of properties are preserved.
All character <strong>SPRM</strong>s that are encountered before the
<strong>sprmCWall</strong> in the text property evaluation specify the
state of the character properties before revision marking is enabled,
whereas all character <strong>SPRM</strong>s that follow the
<strong>sprmCWall</strong> specify the character property modifications
that occur after revision marking is enabled.</p>
<p>A value of 0 specifies that no values have been preserved (overriding
any previously encountered sprmCWall <strong>SPRM</strong>s that specify
the contrary). Neither <strong>SPRM</strong>s encountered before the
sprmCWall, nor subsequent <strong>SPRM</strong>s (until another
sprmCWall, if any), are treated in any special way with regard to
revision marking.</p>
<p>By default, values of properties are not preserved.</p></td>
</tr>
<tr class="odd">
<td><p>sprmCCnf</p>
<p>(0xCA85)</p></td>
<td>0x85</td>
<td><p>A <a href="#cnfoperand"><strong>CNFOperand</strong></a> that
specifies conditional character formatting for a specific condition of a
<a href="#gt_3b7a61db-dd69-4fde-b53f-e445ddb47424"><strong>table
style</strong></a>. The <strong>grpprl</strong> member of
<strong>CNFOperand</strong> specifies the character formatting
properties and MUST NOT contain any <strong>Sprm</strong>s that are
disallowed in the <strong>grpprlChpx</strong> member of <a
href="#upxchpx"><strong>UpxChpx</strong></a>.</p>
<p>This <strong>sprm</strong> MUST only be specified within the
<strong>grpprlChpx</strong> member of a <strong>UpxChpx</strong> within
a table style definition (<a
href="#lpstd"><strong>LPStd</strong></a>).</p>
<p>By default, a table style definition does not include conditional
formatting.</p></td>
</tr>
<tr class="even">
<td><p>sprmCNeedFontFixup</p>
<p>(0x2A86)</p></td>
<td>0x86</td>
<td>An <a href="#ffm"><strong>FFM</strong></a> that specifies the type
of font substitution that is needed for the associated text. Font
substitution is needed when certain language characters are not
supported by the current font for the text, so it is necessary to pick a
different font that supports the characters. By default, text is not
marked as requiring font substitution.</td>
</tr>
<tr class="odd">
<td><p>sprmCPbiIBullet</p>
<p>(0x6887)</p></td>
<td>0x87</td>
<td><p>A <a href="#Section_a3d44e167d2946f7bb7bd0d8a5734f83">CP</a>
value in the Bullet Pictures document that specifies which picture is
used as a bullet character when rendering the bullet. The CP value MUST
be greater than or equal to zero. The Bullet Pictures document is stored
within the main document and marked by a hidden bookmark (1) called
"_PictureBullets."</p>
<p>This <strong>Sprm</strong> MUST NOT be applied to any character other
than a paragraph mark (Unicode 0x000D), a cell mark (Unicode 0x0007), or
a section mark (Unicode 0x000C). If a picture bullet is used,
sprmCPbiGrf MUST be present to specify the properties of the picture
bullet. By default, pictures are not used for rendering
bullets.</p></td>
</tr>
<tr class="even">
<td><p>sprmCPbiGrf</p>
<p>(0x4888)</p></td>
<td>0x88</td>
<td>A <a href="#pbigrfoperand"><strong>PbiGrfOperand</strong></a> value
that specifies whether a picture is used as a bullet character when
rendering the bullet. This value also specifies the properties of the
picture bullet. This <strong>Sprm</strong> MUST NOT be applied to any
character other than a paragraph mark (Unicode 0x000D). If a picture
bullet is used, sprmCPbiIBullet MUST be present to specify the location
of the picture that is used for the bullet. By default, pictures are not
used to render bullets.</td>
</tr>
<tr class="odd">
<td><p>sprmCPropRMark</p>
<p>(0xCA89)</p></td>
<td>0x89</td>
<td><p>A <strong>PropRMarkOperand</strong> value that specifies whether
the text has an associated property revision mark, as well as its author
and the date and time.</p>
<p>By default, text has no property revision marks.</p></td>
</tr>
<tr class="even">
<td><p>sprmCFSdtVanish</p>
<p>(0x2A90)</p></td>
<td>0x90</td>
<td>A <strong>Bool8</strong> value that specifies whether the text is
hidden from display when the option to hide arbitrary XML delimiters is
enabled. This value MUST NOT be applied to any characters other than
'&lt;' (U+003C) or '&gt;' (U+003E) with sprmCFSpec set to "true". By
default, text is not hidden when the option to hide XML delimiters is
enabled.</td>
</tr>
</tbody>
</table>

### Paragraph Properties

A [**Prl**](#prl) with a **sprm.sgc** of 1 modifies a paragraph
property.

The following table specifies the paragraph property modifiers,
including the valid **sprm** values, their function, and the
corresponding **operand** type and meaning.

<table>
<colgroup>
<col style="width: 28%" />
<col style="width: 8%" />
<col style="width: 63%" />
</colgroup>
<thead>
<tr class="header">
<th>sprm</th>
<th>ispmd</th>
<th>Operand</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>sprmPIstd</p>
<p>(0x4600)</p></td>
<td>0x00</td>
<td><p>An unsigned integer that specifies the <strong>istd</strong> of a
paragraph style to apply.</p>
<p>To apply the <strong>istd</strong>, fetch the complete set of
paragraph and character properties from that style. (See <a
href="#Section_4e918665c4da41d8aed5615c2e96c216">Applying Properties</a>
for instructions.) Apply those properties to the current paragraph,
while preserving the previous values of the following:</p>
<ul>
<li><p>Whether the paragraph is a Table Terminating Paragraph Mark (for
example, by sprmPFTtp). (See <a
href="#Section_5b45f0e777604fdbaf880146de2feb4c">Overview of
Tables</a>).</p></li>
<li><p>Whether the paragraph is in a table (for example, by
sprmPFInTable).</p></li>
<li><p>The <a
href="#gt_332456df-c019-4a0b-9f2b-d46730c99760"><strong>table
depth</strong></a> of the paragraph (for example, by
sprmPItap).</p></li>
<li><p>Whether the paragraph is the final paragraph in a nested table
cell (for example, by sprmPFInnerTableCell).</p></li>
<li><p>The table style applied to the paragraph (for example, by <a
href="#table-properties">sprmTIstd</a>).</p></li>
<li><p>The <strong>ipgpSelf</strong> value of the <a
href="#pgpinfo">PGPInfo</a> data that is applied to the paragraph (for
example, by sprmPIpgp).</p></li>
<li><p>Paragraph properties that have been preserved for revision
marking (for example, by sprmPWall) See sprmPWall for the meaning of
revision marking.</p></li>
<li><p>The revision save ID that is associated with the paragraph (for
example, by sprmPRsid), as specified in <a
href="https://go.microsoft.com/fwlink/?LinkId=200054">[ECMA-376]</a>
Part 1, Section 17.15.1.70.</p></li>
<li><p>Whether the paragraph has an associated <a
href="#gt_4d5c1e95-df26-408b-a964-4a6cba5d2239"><strong>property
revision mark</strong></a>, as well as its author and the date and time
(for example, by sprmPPropRMark).</p></li>
<li><p>The numbering revision mark for the paragraph (for example, by
sprmPNumRM).</p></li>
<li><p>Whether a numbered list was applied to the paragraph after the
previous revision (for example, by sprmPFNumRMIns).</p></li>
</ul>
<p>An <strong>istd</strong> value in the range of 1 to 9, inclusive,
also specifies the <a
href="#gt_a5cd5eff-ddeb-490b-bc71-f6256774e3c3"><strong>outline
level</strong></a> of the paragraph (for example, by sprmPOutLvl), where
the new outline level is equal to the value of the <strong>istd</strong>
minus 1.</p>
<p>If an <strong>istd</strong> value refers to an empty or nonexistent
style, or to a style of a different type, a later Prl such as sprmPIstd
or sprmPIstdPermute MUST change the <strong>istd</strong> to a valid
value. Applying an <strong>istd</strong> that refers to an empty or
nonexistent style, or to a style of a different type, is equivalent to
applying the paragraph and character document default formatting (while
preserving the same set of properties as when applying an
<strong>istd</strong>.)</p>
<p>By default, the paragraph style is unchanged.</p></td>
</tr>
<tr class="even">
<td><p>sprmPIstdPermute</p>
<p>(0xC601)</p></td>
<td>0x01</td>
<td><p>A <a href="#sppoperand">SPPOperand</a> value that specifies a
potential change in the current paragraph style
(<strong>istd</strong>).</p>
<p>If the <strong>istd</strong> is not affected, this Prl MUST be
ignored.</p>
<p>If the <strong>istd</strong> is affected, this <strong>sprm</strong>
is equivalent to sprmPIstd with the operand being the new
<strong>istd</strong>.</p></td>
</tr>
<tr class="odd">
<td><p>sprmPIncLvl</p>
<p>(0x2602)</p></td>
<td>0x02</td>
<td><p>A signed 8-bit integer value. If the paragraph has an
<strong>istd</strong> that is greater than or equal to 0x0001 and less
than or equal to 0x0009, this value specifies an offset to the
<strong>istd</strong> of the paragraph. If this value offsets the
<strong>istd</strong> of the paragraph beyond one of the limits 0x0001
or 0x0009, then the <strong>istd</strong> of the paragraph is set to
that limit. See <a
href="#Section_d8b661231a3d4e0694c55ab16e9b6417">Determining Formatting
Properties</a> for information about how to determine the
<strong>istd</strong> of the paragraph.</p>
<p>If the <strong>istd</strong> of the paragraph is not within the range
that was specified earlier, this value specifies an offset to the
outline level of the paragraph, unless the outline level of the
paragraph is equal to 0x09, in which case this value MUST be ignored. If
this offset adjusts the outline level beyond one of the limits 0x00 or
0x09, than the outline level of the paragraph is set to that limit. See
sprmPOutLvl for the outline level of the paragraph.</p></td>
</tr>
<tr class="even">
<td><p>sprmPJc80</p>
<p>(0x2403)</p></td>
<td>0x03</td>
<td><p>An unsigned 8-bit integer that specifies the physical
justification of the paragraph. This MUST be one of the following
values.</p>
<blockquote>
<p>0 - Paragraph is physically left justified.</p>
<p>1 - Paragraph is centered.</p>
<p>2 - Paragraph is physically right justified.</p>
<p>3 - Paragraph is justified to both right and left with a low
character compression ratio.</p>
<p>4 - Paragraph is justified to both right and left with a medium
character compression ratio.</p>
<p>5 - Paragraph is justified to both right and left with a high
character compression ratio.</p>
</blockquote>
<p>By default, paragraphs are physically left-justified.</p></td>
</tr>
<tr class="odd">
<td><p>sprmPFKeep</p>
<p>(0x2405)</p></td>
<td>0x05</td>
<td>A <a href="#bool8">Bool8</a> value that specifies whether an
application SHOULD<span id="Appendix_A_Target_148"
class="anchor"></span><a href="#Appendix_A_148">&lt;148&gt;</a> keep
this paragraph on a single page. By default, paragraphs are allowed to
split across pages.</td>
</tr>
<tr class="even">
<td><p>sprmPFKeepFollow</p>
<p>(0x2406)</p></td>
<td>0x06</td>
<td>A Bool8 value that specifies whether an application SHOULD<span
id="Appendix_A_Target_149" class="anchor"></span><a
href="#Appendix_A_149">&lt;149&gt;</a> keep the end of this paragraph on
the same page as the beginning of the next paragraph. By default,
adjacent paragraphs are allowed to be on separate pages.</td>
</tr>
<tr class="odd">
<td><p>sprmPFPageBreakBefore</p>
<p>(0x2407)</p></td>
<td>0x07</td>
<td><p>A Bool8 value that specifies whether this paragraph has a page
break before it.</p>
<p>By default, paragraphs do not have page breaks before them.</p></td>
</tr>
<tr class="even">
<td><p>sprmPIlvl</p>
<p>(0x260A)</p></td>
<td>0x0A</td>
<td><p>An unsigned 8-bit integer that specifies the <a
href="#gt_e2949054-8f67-44de-a1bd-d5dd8eb228ca"><strong>list
level</strong></a> of the paragraph. This value MUST be ignored if this
paragraph is not in a list (see sprmPIlfo). This value MUST be one of
the following:</p>
<blockquote>
<p><strong>0x0 - 0x8</strong></p>
<p>The value specifies the zero-based level of the list that contains
this paragraph. For example, a value of 0x0 means that the paragraph is
in the first level of the list.</p>
<p><strong>0xC</strong></p>
<p>The list skips this paragraph and does not include it in its
numbering.</p>
</blockquote>
<p>By default, a paragraph is in the first level of the list.</p></td>
</tr>
<tr class="odd">
<td><p>sprmPIlfo</p>
<p>(0x460B)</p></td>
<td>0x0B</td>
<td><p>A 16-bit signed integer value that is used to determine which
list contains the paragraph. This value MUST be one of the
following:</p>
<blockquote>
<p><strong>0x0000</strong></p>
<p>This paragraph is not in a list, and any list formatting on the
paragraph is removed.</p>
<p><strong>0x0001 - 0x07FE</strong></p>
<p>The value is a 1-based index into PlfLfo.rgLfo. The LFO at this index
defines the list that this paragraph is in.</p>
<p><strong>0xF801</strong></p>
<p>This paragraph is not in a list.</p>
<p><strong>0xF802 - 0xFFFF</strong></p>
<p>The value is the negation of a 1-based index into PlfLfo.rgLfo. The
LFO at this index defines the list that this paragraph is in. The
logical left indentation (see sprmPDxaLeft) and the logical left first
line indentation (see sprmPDxaLeft1) of the paragraph MUST be preserved
despite any list formatting.</p>
</blockquote>
<p>By default, a paragraph is not in a list.</p></td>
</tr>
<tr class="even">
<td><p>sprmPFNoLineNumb</p>
<p>(0x240C)</p></td>
<td>0x0C</td>
<td>A Bool8 value that specifies whether this paragraph is ignored when
the application counts or displays <a
href="#gt_4093a4dd-d31a-4787-b0e7-a55ac524f588"><strong>line
numbers</strong></a>. By default, if line numbers are enabled,
paragraphs have line numbers.</td>
</tr>
<tr class="odd">
<td><p>sprmPChgTabsPapx</p>
<p>(0xC60D)</p></td>
<td>0x0D</td>
<td>A <a href="#pchgtabspapxoperand">PChgTabsPapxOperand</a> value that
specifies custom tab stops to be added or ignored. By default, custom
tab stops are neither added nor ignored.</td>
</tr>
<tr class="even">
<td><p>sprmPDxaRight80</p>
<p>(0x840E)</p></td>
<td>0x0E</td>
<td>An <a href="#xas">XAS</a> value that specifies the <a
href="#gt_85b72f6e-f8a8-411b-bfaa-307e5a0b793d"><strong>physical
right</strong></a> indent of the paragraph, in <a
href="#gt_4b82472c-103d-4eff-a07e-6a0f784e3382"><strong>twips</strong></a>.
By default, there is no right indentation.</td>
</tr>
<tr class="odd">
<td><p>sprmPDxaLeft80</p>
<p>(0x840F)</p></td>
<td>0x0F</td>
<td>An XAS value that specifies the <a
href="#gt_109a1037-0ae1-48da-8597-dc99be0a0aa8"><strong>physical
left</strong></a> indent of the paragraph, in twips. By default, there
is no left indentation.</td>
</tr>
<tr class="even">
<td><p>sprmPNest80</p>
<p>(0x4610)</p></td>
<td>0x10</td>
<td>An XAS value that is added to sprmPDxaLeft80 to specify the final
indent of a paragraph. By default, there is no additional space added to
sprmPDxaLeft80 to determine the final indent of a paragraph.</td>
</tr>
<tr class="odd">
<td><p>sprmPDxaLeft180</p>
<p>(0x8411)</p></td>
<td>0x11</td>
<td>An XAS value that specifies the logical left indent of the first
line of the paragraph, in twips, relative to the rest of the paragraph.
By default, the first line is not indented relative to the rest of the
paragraph.</td>
</tr>
<tr class="even">
<td><p>sprmPDyaLine</p>
<p>(0x6412)</p></td>
<td>0x12</td>
<td>An <a href="#lspd">LSPD</a> value that specifies the spacing between
lines in this paragraph. By default, paragraphs use single spacing.</td>
</tr>
<tr class="odd">
<td><p>sprmPDyaBefore</p>
<p>(0xA413)</p></td>
<td>0x13</td>
<td>A two-byte unsigned integer value that specifies the size, in twips,
of the spacing before this paragraph. The value MUST be a number between
0x0000 and 0x7BC0, inclusive. When auto-spacing is supported and the
value of sprmPFDyaBeforeAuto is 1, this property is ignored. By default,
the space before a paragraph is zero twips.</td>
</tr>
<tr class="even">
<td><p>sprmPDyaAfter</p>
<p>(0xA414)</p></td>
<td>0x14</td>
<td>A two-byte unsigned integer value that specifies the size, in twips,
of the spacing after this paragraph. The value MUST be between 0x0000
and 0x7BC0, inclusive. When <a
href="#gt_8e3c4123-5325-4883-8195-ddb4531957fe"><strong>auto
spacing</strong></a> is supported and the value of sprmPFDyaAfterAuto is
1, this property is ignored. By default, the space after a paragraph is
zero twips.</td>
</tr>
<tr class="odd">
<td><p>sprmPChgTabs</p>
<p>(0xC615)</p></td>
<td>0x15</td>
<td>A <a href="#pchgtabsoperand">PChgTabsOperand</a> value that
specifies custom tab stops that are added or ignored. By default, custom
tab stops are neither added nor ignored.</td>
</tr>
<tr class="even">
<td><p>sprmPFInTable</p>
<p>(0x2416)</p></td>
<td>0x16</td>
<td>A Bool8 value that specifies whether this paragraph is in a table.
The value MUST be 1 any time the table depth is greater than zero. See
section 2.4.3, Overview of Tables. By default, paragraphs are not in
tables.</td>
</tr>
<tr class="odd">
<td><p>sprmPFTtp</p>
<p>(0x2417)</p></td>
<td>0x17</td>
<td>A Bool8 that, when set to 1, specifies that the cell mark it is
applied to is a Table Terminating Paragraph (TTP) mark. The TTP mark
MUST be immediately preceded by a cell mark. See Overview of Tables. By
default, a cell mark is not a Table Terminating Paragraph Mark.</td>
</tr>
<tr class="even">
<td><p>sprmPDxaAbs</p>
<p>(0x8418)</p></td>
<td>0x18</td>
<td><p>A <a href="#xas_plusone">XAS_plusOne</a> that specifies the <a
href="#gt_ccc2ab6c-db9b-4c67-9b95-21ce79e7358d"><strong>logical
left</strong></a> horizontal position relative to the horizontal anchor
of the <a
href="#gt_1c54183d-33fa-463c-b929-e996d716e3bb"><strong>frame</strong></a>.
See sprmPPc for the frame anchor. If the value is any of the those that
follow, the operand specifies a special descriptive, relative position.
The meanings that are provided correspond to the values that are
specified in [ECMA-376] Part 1, Section 22.9.2.18 ST_XAlign (Horizontal
Alignment Location):</p>
<blockquote>
<p>0x0000 - left</p>
<p>0xFFFC - center</p>
<p>0xFFF8 - right</p>
<p>0xFFF4 - inside</p>
<p>0xFFF0 - outside</p>
</blockquote>
<p>By default, the relative horizontal position is
<strong>Left</strong>.</p></td>
</tr>
<tr class="odd">
<td><p>sprmPDyaAbs</p>
<p>(0x8419)</p></td>
<td>0x19</td>
<td><p>A <a href="#yas_plusone">YAS_plusOne</a> value that specifies
downward vertical position relative to the vertical anchor of the frame.
See sprmPPc for the frame anchor. If the value is any of those that
follow, the operand specifies a special descriptive, relative position.
The meanings that are provided correspond to the values that are
specified in [ECMA-376] Part 1, Section 22.9.2.20 ST_YAlign (Vertical
Alignment Location).</p>
<blockquote>
<p>0x0000 - inline</p>
<p>0xFFFC - top</p>
<p>0xFFF8 - center</p>
<p>0xFFF4 - bottom</p>
<p>0xFFF0 - inside</p>
<p>0xFFEC - outside</p>
</blockquote>
<p>By default, the relative vertical position is 0x0000
(<strong>Inline</strong>).</p></td>
</tr>
<tr class="even">
<td><p>sprmPDxaWidth</p>
<p>(0x841A)</p></td>
<td>0x1A</td>
<td>A <a href="#xas_nonneg">XAS_nonNeg</a> value that specifies the
width of the frame. If the operand value is 0, the width of the frame is
automatically determined by the maximum line width of the content that
is within the frame. By default, the width of the frame is automatically
determined by the maximum line width of the content the frame
contains.</td>
</tr>
<tr class="odd">
<td><p>sprmPPc</p>
<p>(0x261B)</p></td>
<td>0x1B</td>
<td>A <a href="#positioncodeoperand">PositionCodeOperand</a> that
specifies the anchor from which the frame position is calculated.</td>
</tr>
<tr class="even">
<td><p>sprmPWr</p>
<p>(0x2423)</p></td>
<td>0x23</td>
<td><p>A 1-byte integer that specifies how text is wrapped around a
frame. Its value MUST be one of those that follow, corresponding to the
values of <strong>ST_Wrap</strong> that are specified in [ECMA-376] Part
1, Section 17.18.104 ST_Wrap (Text Wrapping around Text Frame type).</p>
<blockquote>
<p><strong>0x00</strong></p>
<p><strong>ST_Wrap: auto</strong></p>
<p>This value specifies automatic text wrapping.</p>
<p><strong>0x01</strong></p>
<p><strong>ST_Wrap: notBeside</strong></p>
<p>This value specifies that there is no text wrapping to either side of
the frame.</p>
<p><strong>0x02</strong></p>
<p><strong>ST_Wrap: around</strong></p>
<p>This value specifies that text is wrapped around the frame.</p>
<p><strong>0x03</strong></p>
<p><strong>ST_Wrap: none</strong></p>
<p>Text is not wrapped around the frame.</p>
<p><strong>0x04</strong></p>
<p><strong>ST_Wrap: tight</strong></p>
<p>This value specifies that text is tightly wrapped around the
frame.</p>
<p><strong>0x05</strong></p>
<p><strong>ST_Wrap: through</strong></p>
<p>This value specifies that text is wrapped through the frame, to the
contours of the contents of the frame.</p>
</blockquote>
<p>By default, text is automatically wrapped around a frame.</p></td>
</tr>
<tr class="odd">
<td><p>sprmPBrcTop80</p>
<p>(0x6424)</p></td>
<td>0x24</td>
<td><p>A <a href="#brc80">Brc80</a> value that specifies the top border
of the paragraph. This border is hidden if the previous paragraph is
identical to this one in terms of its top, bottom, left, and right
borders; its left and right indents; its table depth; and its sprmPIpgp
value.</p>
<p>By default, paragraphs have no top border.</p></td>
</tr>
<tr class="even">
<td><p>sprmPBrcLeft80</p>
<p>(0x6425)</p></td>
<td>0x25</td>
<td>A Brc80 value that specifies the logical left border of the
paragraph. By default, paragraphs have no logical left border.</td>
</tr>
<tr class="odd">
<td><p>sprmPBrcBottom80</p>
<p>(0x6426)</p></td>
<td>0x26</td>
<td><p>A Brc80 value that specifies the bottom border of the paragraph.
This border is hidden if the next paragraph is identical to this one in
terms of its top, bottom, left, and right borders; its left and right
indents; its table depth; and its sprmPIpgp value.</p>
<p>By default, paragraphs have no bottom border.</p></td>
</tr>
<tr class="even">
<td><p>sprmPBrcRight80</p>
<p>(0x6427)</p></td>
<td>0x27</td>
<td>A Brc80 value that specifies the <a
href="#gt_ef86cf61-a2e3-4130-abc4-9e92dae5a2a7"><strong>logical
right</strong></a> border of the paragraph. By default, paragraphs have
no logical right border.</td>
</tr>
<tr class="odd">
<td><p>sprmPBrcBetween80</p>
<p>(0x6428)</p></td>
<td>0x28</td>
<td><p>A Brc80 value that specifies the border between this paragraph
and the next. This border is hidden unless the next paragraph is
identical to this one in terms of its top, bottom, left, and right
borders; its left and right indents; its table depth; and its sprmPIpgp
value.</p>
<p>By default, paragraphs have no borders between them.</p></td>
</tr>
<tr class="even">
<td><p>sprmPBrcBar80</p>
<p>(0x6629)</p></td>
<td>0x29</td>
<td>A Brc80 value that has no effect.</td>
</tr>
<tr class="odd">
<td><p>sprmPFNoAutoHyph</p>
<p>(0x242A)</p></td>
<td>0x2A</td>
<td><p>A Bool8 value that specifies whether this paragraph is <a
href="#gt_e6b48619-23ab-4988-a50b-e19e60cfb108"><strong>auto-hyphenated</strong></a>
when hyphenation is enabled for the document. A value of 1 specifies
that this paragraph is not auto-hyphenated when hyphenation is enabled
for the document. A value of 0 specifies that this paragraph is
auto-hyphenated when hyphenation is enabled for the document. By
default, paragraphs are auto-hyphenated when hyphenation is enabled for
the document.</p>
<p>Document hyphenation is enabled when the <strong>fAutoHyphen</strong>
field of the <a href="#dopbase">DopBase</a> structure is 1.</p></td>
</tr>
<tr class="even">
<td><p>sprmPWHeightAbs</p>
<p>(0x442B)</p></td>
<td>0x2B</td>
<td>A <a href="#wheightabs">WHeightAbs</a> value that specifies the
height of the frame. By default, the height of a frame height is
automatically determined based on the height of its contents.</td>
</tr>
<tr class="odd">
<td><p>sprmPDcs</p>
<p>(0x442C)</p></td>
<td>0x2C</td>
<td>A <a href="#dcs">DCS</a> value that specifies the properties, if
any, of the drop cap for this paragraph. By default, paragraphs do not
have a drop cap.</td>
</tr>
<tr class="even">
<td><p>sprmPShd80</p>
<p>(0x442D)</p></td>
<td>0x2D</td>
<td>A <a href="#shd80">Shd80</a> structure that specifies the background
shading for the paragraph. By default, paragraphs are not shaded.</td>
</tr>
<tr class="odd">
<td><p>sprmPDyaFromText</p>
<p>(0x842E)</p></td>
<td>0x2E</td>
<td>A <a href="#yas_nonneg">YAS_nonNeg</a> value that specifies the
minimum vertical distance between the edge of the frame and the edge of
<a href="#Section_f426d9a2004d418e8d8ce7fd88e7c48e">main document</a>
text that wraps around the frame. By default, the minimum vertical
distance is 0 twips.</td>
</tr>
<tr class="even">
<td><p>sprmPDxaFromText</p>
<p>(0x842F)</p></td>
<td>0x2F</td>
<td>A XAS_nonNeg value that specifies the minimum horizontal distance
between the edge of the frame and the edge of main document text that
wraps around the frame. By default, the minimum horizontal distance is 0
twips.</td>
</tr>
<tr class="odd">
<td><p>sprmPFLocked</p>
<p>(0x2430)</p></td>
<td>0x30</td>
<td>A Bool8 value that specifies whether the anchor of the frame which
contains this paragraph is locked to its current location. By default,
the frame anchor is not locked. This <a href="#sprm">Sprm</a>
corresponds to the <strong>anchorLock</strong> attribute as specified in
[ECMA-376] Part 1, Section 17.3.1.11 framePr (Text Frame
Properties)</td>
</tr>
<tr class="even">
<td><p>sprmPFWidowControl</p>
<p>(0x2431)</p></td>
<td>0x31</td>
<td>A Bool8 value that specifies whether widow and orphan control is
enabled for this paragraph. An orphaned line is the first line of a
paragraph when it is displayed by itself at the bottom of a page. A
widowed line is the last line of a paragraph when it is displayed by
itself at the top of a page. When widow and orphan control is enabled,
the application attempts to eliminate widowed and orphaned lines. By
default, widow and orphan control is enabled.</td>
</tr>
<tr class="odd">
<td><p>sprmPFKinsoku</p>
<p>(0x2433)</p></td>
<td>0x33</td>
<td>A Bool8 value that specifies whether this paragraph uses East Asian
typography and line-breaking rules to determine the valid characters
that are allowed to begin and end each line of East Asian text. These
rules are specified in [ECMA-376] Part 1, Section 17.3.1.16 kinsoku
paragraph property. By default, paragraphs use East Asian rules to
determine the allowed values for the first and last characters of each
line of text.</td>
</tr>
<tr class="even">
<td><p>sprmPFWordWrap</p>
<p>(0x2434)</p></td>
<td>0x34</td>
<td><p>A Bool8 value that, when equal to 0, specifies a preference to
break Latin text that exceeds text line limits by breaking a word across
two lines (breaking on the character level). If the language used is
Korean, this property affects Korean text instead of Latin text.</p>
<p>By default, the word is placed on the following line (breaking on the
word level).</p></td>
</tr>
<tr class="odd">
<td><p>sprmPFOverflowPunct</p>
<p>(0x2435)</p></td>
<td>0x35</td>
<td><p>A Bool8 value that, when equal to 0, specifies a preference
against allowing a punctuation character that follows a word at the end
of a line to appear beyond the extent of that line of text.</p>
<p>By default, a single punctuation character that follows a word can
appear beyond the extent of a line.</p></td>
</tr>
<tr class="even">
<td><p>sprmPFTopLinePunct</p>
<p>(0x2436)</p></td>
<td>0x36</td>
<td><p>A Bool8 value that specifies a preference to render punctuation
characters at the beginning of a line so that they appear to be closer
to both the beginning of the line and to the next character, regardless
of the amount of whitespace in the glyph as defined by the font.</p>
<p>By default, punctuation is rendered normally.</p></td>
</tr>
<tr class="odd">
<td><p>sprmPFAutoSpaceDE</p>
<p>(0x2437)</p></td>
<td>0x37</td>
<td>A Bool8 value that specifies whether space is automatically inserted
between East Asian and Latin text. By default, this option is
enabled.</td>
</tr>
<tr class="even">
<td><p>sprmPFAutoSpaceDN</p>
<p>(0x2438)</p></td>
<td>0x38</td>
<td>A Bool8 value that specifies whether space is automatically inserted
between East Asian text and numbers. By default, this option is
enabled.</td>
</tr>
<tr class="odd">
<td><p>sprmPWAlignFont</p>
<p>(0x4439)</p></td>
<td>0x39</td>
<td><p>A 16-bit unsigned integer that specifies vertical font alignment
for East Asian languages. This Sprm corresponds to the
<strong>textAlignment</strong> paragraph property that is specified in
[ECMA-376] Part 1, Section 17.3.1.39. This value MUST be one of the
following, corresponding to the values of ST_TextAlignment that are
specified in [ECMA-376] Part 1, Section 17.18.91.</p>
<blockquote>
<p><strong>0x0000</strong></p>
<p><strong>ST_TextAlignment: top</strong></p>
<p>This value specifies that characters are aligned based on the top of
each character.</p>
<p><strong>0x0001</strong></p>
<p><strong>ST_TextAlignment: center</strong></p>
<p>This value specifies that characters are centered on the line.</p>
<p><strong>0x0002</strong></p>
<p><strong>ST_TextAlignment: baseline</strong></p>
<p>This value specifies that characters are aligned based on their
baseline. This is how standard Latin text is displayed.</p>
<p><strong>0x0003</strong></p>
<p><strong>ST_TextAlignment: bottom</strong></p>
<p>This value specifies that characters are aligned based on the bottom
of each character.</p>
<p><strong>0x0004</strong></p>
<p><strong>ST_TextAlignment: auto</strong></p>
<p>This value specifies that alignment is automatically determined by
the application.</p>
</blockquote>
<p>By default, font alignment is automatically determined by the
application.</p></td>
</tr>
<tr class="even">
<td><p>sprmPFrameTextFlow</p>
<p>(0x443A)</p></td>
<td>0x3A</td>
<td><p>A <a href="#frametextflowoperand">FrameTextFlowOperand</a> that
specifies the direction of text flow in the frame. If this property is
set, then at least one of the following paragraph properties MUST be set
with a non-default value:</p>
<ul>
<li><p>sprmPDxaAbs</p></li>
<li><p>sprmPDyaAbs</p></li>
<li><p>sprmPDxaWidth</p></li>
<li><p>sprmPPc</p></li>
<li><p>sprmPWr</p></li>
<li><p>sprmPWHeightAbs</p></li>
</ul>
<p>By default, paragraph text flows horizontally, without
rotation.</p></td>
</tr>
<tr class="odd">
<td><p>sprmPOutLvl</p>
<p>(0x2640)</p></td>
<td>0x40</td>
<td><p>An unsigned 8-bit integer value that specifies the outline level
of the paragraph. This value MUST be one of the following.</p>
<blockquote>
<p><strong>0x0 - 0x8</strong></p>
<p>The value is the zero-based outline level that this paragraph is
in.</p>
<p><strong>0x9</strong></p>
<p>The paragraph at any outline level; instead, the paragraph is body
text.</p>
</blockquote>
<p>This MUST be ignored if the paragraph has an <strong>istd</strong>
that is greater than or equal to 0x1 and less than or equal to 0x9. By
default, paragraphs are body text, and are therefore not in any outline
level.</p></td>
</tr>
<tr class="even">
<td><p>sprmPFBiDi</p>
<p>(0x2441)</p></td>
<td>0x41</td>
<td><p>A Bool8 value that specifies whether the paragraph uses <a
href="#gt_91359688-7863-4e88-b507-f57b3dada5ec"><strong>right-to-left</strong></a>
layout.</p>
<p>By default, a paragraph does not use right-to-left layout.</p></td>
</tr>
<tr class="odd">
<td><p>sprmPFNumRMIns</p>
<p>(0x2443)</p></td>
<td>0x43</td>
<td>A Bool8 value that specifies whether a numbered list was applied to
this paragraph after the previous revision. By default, paragraphs do
not have numbered lists applied.</td>
</tr>
<tr class="even">
<td><p>sprmPNumRM</p>
<p>(0xC645)</p></td>
<td>0x45</td>
<td>A <a href="#numrmoperand">NumRMOperand</a> value that specifies a
numbering revision mark for this paragraph. By default, paragraphs do
not have numbering revision marks.</td>
</tr>
<tr class="odd">
<td><p>sprmPHugePapx</p>
<p>(0x6646)</p></td>
<td>0x46</td>
<td><p>A 4-byte unsigned integer that specifies a location in the <a
href="#Section_0218f8a661504695965c9abc8a685b81">Data Stream</a>. A <a
href="#prcdata">PrcData</a> structure begins at this offset and
specifies additional properties for the paragraph. The
<strong>cbGrpprl</strong> member of the referenced PrcData structure
MUST NOT be less than 10. If an application processes this PrcData, then
it MUST NOT process any more Prl elements in the array that contained
the sprmPHugePapx.</p>
<p>If a Prl with a <strong>sprm</strong> of
<strong>sprmPHugePapx</strong> is in an array of Prl elements and is not
the first element of the array, then that Prl MUST be ignored. If a Prl
with a <strong>sprm</strong> of <strong>sprmPHugePapx</strong> is
contained in the <strong>grpprl</strong> array of a <a
href="#grpprlandistd">GrpPrlAndIstd</a> structure, then it MUST be the
only Prl in that array and the <strong>istd</strong> member of that
GrpPrlAndIstd structure MUST be zero.</p>
<p>The <strong>sprmPHugePapx</strong> and sprmPTableProps values can
refer to PrcDatas containing each other, but the chain MUST eventually
terminate in a PrcData structure does not contain a
<strong>sprmPHugePapx</strong> value or a sprmPTableProps
value.</p></td>
</tr>
<tr class="even">
<td><p>sprmPFUsePgsuSettings</p>
<p>(0x2447)</p></td>
<td>0x47</td>
<td>A Bool8 value that specifies whether the paragraph adheres to the
vertical components of the <a
href="#gt_f1f5f018-eebc-4631-9036-ed857713c71c"><strong>document
grid</strong></a>. By default, text uses the document grid if one is
defined. (See <a href="#section-properties">sprmSClm</a> for more
details about the document grid.)</td>
</tr>
<tr class="odd">
<td><p>sprmPFAdjustRight</p>
<p>(0x2448)</p></td>
<td>0x48</td>
<td>A Bool8 value that specifies whether this paragraph is set to
automatically adjust the right indent when a document grid for <a
href="#gt_8dcae18f-67a0-4282-860e-1b6713fe6aae"><strong>East Asian
characters</strong></a> is defined. This Sprm is the same as the
<strong>adjustRightInd</strong> paragraph property specified in
[ECMA-376] Part 1, Section 17.3.1.1. By default, this option is
enabled.</td>
</tr>
<tr class="even">
<td><p>sprmPItap</p>
<p>(0x6649)</p></td>
<td>0x49</td>
<td>An integer value that specifies the table depth of this paragraph.
See the Overview of Tables (section 2.4.3) for the rules that this value
follows. This value, when present, MUST be a non-negative number. By
default, paragraphs are not in tables.</td>
</tr>
<tr class="odd">
<td><p>sprmPDtap</p>
<p>(0x664A)</p></td>
<td>0x4A</td>
<td><p>A signed integer that specifies an addition or subtraction to the
existing table depth of this paragraph. It provides an alternate way of
specifying table depth to sprmPItap or a way to increment or decrement
any value that was already set by sprmPItap or
<strong>sprmPDtap</strong>.</p>
<p>The resultant table depth MUST be non-negative and MUST obey the
rules described in Overview of Tables (section 2.4.3).</p>
<p>By default, paragraphs are not in tables.</p></td>
</tr>
<tr class="even">
<td><p>sprmPFInnerTableCell</p>
<p>(0x244B)</p></td>
<td>0x4B</td>
<td><p>A Bool8 value that specifies whether this paragraph is the final
paragraph in a nested table cell.</p>
<p>When <strong>true</strong>, the nesting level of this paragraph MUST
be greater than 1, indicating that this paragraph is in a table which is
nested within another table.</p>
<p>When <strong>true</strong>, this is the last paragraph of a nested
table cell and its <a
href="#gt_561de4b6-b1fb-438b-9eb7-57ce57eabab3"><strong>paragraph
mark</strong></a> is treated as if it were an <a
href="#gt_2dfdaa55-39fd-4dc0-a630-dae1c4c09c9b"><strong>end of cell
mark</strong></a>. By default, paragraphs are not the last paragraph of
a nested table cell. See the Overview of Tables (section 2.4.3) for more
information about nested tables.</p></td>
</tr>
<tr class="odd">
<td><p>sprmPFInnerTtp</p>
<p>(0x244C)</p></td>
<td>0x4C</td>
<td>A Bool8 value that specifies whether this paragraph is the final
paragraph in a nested table row. When 1, the table depth of this
paragraph MUST be greater than 1, indicating that this paragraph is in a
table that is nested within another table. When 1, this is the last
paragraph of a nested table row and its paragraph mark is treated as if
it were a TTP mark. By default, paragraphs are not the last paragraph of
a nested table row. See the Overview of Tables for more information
about nested tables.</td>
</tr>
<tr class="even">
<td><p>sprmPShd</p>
<p>(0xC64D)</p></td>
<td>0x4D</td>
<td>A <a href="#shdoperand">SHDOperand</a> value that specifies the
background shading for the paragraph. By default, paragraphs are not
shaded.</td>
</tr>
<tr class="odd">
<td><p>sprmPBrcTop</p>
<p>(0xC64E)</p></td>
<td>0x4E</td>
<td><p>A <a href="#brcoperand">BrcOperand</a> value which specifies the
top border of the paragraph. This border is hidden if the previous
paragraph is identical to this one in terms of its top, bottom, left,
and right borders; its left and right indents; its table depth; and its
sprmPIpgp value.</p>
<p>By default, paragraphs have no top border.</p></td>
</tr>
<tr class="even">
<td><p>sprmPBrcLeft</p>
<p>(0xC64F)</p></td>
<td>0x4F</td>
<td>A BrcOperand value that specifies the logical left border of the
paragraph. By default, paragraphs have no logical left border.</td>
</tr>
<tr class="odd">
<td><p>sprmPBrcBottom</p>
<p>(0xC650)</p></td>
<td>0x50</td>
<td><p>A BrcOperand value that specifies the bottom border of the
paragraph This border is hidden if the next paragraph is identical to
this one in terms of its top, bottom, left, and right borders; its left
and right indents; its table depth; and its sprmPIpgp value.</p>
<p>By default, paragraphs have no bottom border.</p></td>
</tr>
<tr class="even">
<td><p>sprmPBrcRight</p>
<p>(0xC651)</p></td>
<td>0x51</td>
<td>A BrcOperand value that specifies the logical right border of the
paragraph. By default, paragraphs have no logical right border.</td>
</tr>
<tr class="odd">
<td><p>sprmPBrcBetween</p>
<p>(0xC652)</p></td>
<td>0x52</td>
<td><p>A BrcOperand value that specifies the border between this
paragraph and the next. This border is hidden unless the next paragraph
is identical to this one in terms of its top, bottom, left, and right
borders, left and right indents, table depth, and sprmPIpgp value.</p>
<p>By default, paragraphs have no borders between them.</p></td>
</tr>
<tr class="even">
<td><p>sprmPBrcBar</p>
<p>(0xC653)</p></td>
<td>0x53</td>
<td>A BrcOperand value that has no effect.</td>
</tr>
<tr class="odd">
<td><p>sprmPDxcRight</p>
<p>(0x4455)</p></td>
<td>0x55</td>
<td>A signed 16-bit integer value that specifies the logical right
indent of the paragraph in hundredths of <a
href="#gt_f15b67ae-3a41-4195-9fac-486a7c1dfc8a"><strong>character
units</strong></a>. By default, there is no right indentation.</td>
</tr>
<tr class="even">
<td><p>sprmPDxcLeft</p>
<p>(0x4456)</p></td>
<td>0x56</td>
<td>A signed 16-bit integer value that specifies the logical left indent
of the paragraph in hundredths of character units. By default, there is
no left indentation.</td>
</tr>
<tr class="odd">
<td><p>sprmPDxcLeft1</p>
<p>(0x4457)</p></td>
<td>0x57</td>
<td>A signed 16-bit integer value that specifies the logical left indent
of the first line of the paragraph, in hundredths of character units,
relative to the rest of the paragraph. By default, the first line is not
indented relative to the rest of the paragraph.</td>
</tr>
<tr class="even">
<td><p>sprmPDylBefore</p>
<p>(0x4458)</p></td>
<td>0x58</td>
<td>A signed 16-bit integer value that specifies the spacing before the
paragraph, in 1/100 <a
href="#gt_2b06da34-43bc-48de-9012-439dab21a533"><strong>line
units</strong></a>. This value MUST be at least -20 and MUST NOT exceed
31680. By default, paragraphs do not have spacing before them.</td>
</tr>
<tr class="odd">
<td><p>sprmPDylAfter</p>
<p>(0x4459)</p></td>
<td>0x59</td>
<td>A signed 16-bit integer that specifies the spacing after the
paragraph, in 1/100 line units. MUST be at least -20 and MUST NOT exceed
31680. By default, paragraphs do not have spacing after them.</td>
</tr>
<tr class="even">
<td><p>sprmPFOpenTch</p>
<p>(0x245A)</p></td>
<td>0x5A</td>
<td>A Bool8 value that specifies whether this table cell mark was being
displayed when this file was last saved, even though it immediately
follows a nested table.</td>
</tr>
<tr class="odd">
<td><p>sprmPFDyaBeforeAuto</p>
<p>(0x245B)</p></td>
<td>0x5B</td>
<td>A Bool8 value that specifies whether the space displayed before this
paragraph uses auto spacing. A value of 1 specifies that the
sprmPDyaBefore value MUST be ignored when the application supports auto
spacing. By default, auto spacing is disabled for paragraphs.</td>
</tr>
<tr class="even">
<td><p>sprmPFDyaAfterAuto</p>
<p>(0x245C)</p></td>
<td>0x5C</td>
<td>A Bool8 value that specifies whether the space displayed after this
paragraph uses auto spacing. A value of 1 specifies that sprmPDyaAfter
MUST be ignored if the application supports auto spacing. By default,
auto spacing is disabled for paragraphs.</td>
</tr>
<tr class="odd">
<td><p>sprmPDxaRight</p>
<p>(0x845D)</p></td>
<td>0x5D</td>
<td>An XAS value that specifies the logical right indent of the
paragraph, in twips. By default, there is no right indentation.</td>
</tr>
<tr class="even">
<td><p>sprmPDxaLeft</p>
<p>(0x845E)</p></td>
<td>0x5E</td>
<td>An XAS value that specifies the logical left indent of the
paragraph, in twips. By default, there is no left indentation.</td>
</tr>
<tr class="odd">
<td><p>sprmPNest</p>
<p>(0x465F)</p></td>
<td>0x5F</td>
<td>An XAS value that is added to the sprmPDxaLeft value to determine
the final indent of a paragraph. By default, there is no additional
space added to sprmPDxaLeft to determine the final indent of a
paragraph. When present, this Sprm supersedes any value for
sprmPNest80.</td>
</tr>
<tr class="even">
<td><p>sprmPDxaLeft1</p>
<p>(0x8460)</p></td>
<td>0x60</td>
<td>An XAS value that specifies the logical left indent of the first
line of the paragraph, in twips, relative to the rest of the paragraph.
By default, the first line is not indented relative to the rest of the
paragraph.</td>
</tr>
<tr class="odd">
<td><p>sprmPJc</p>
<p>(0x2461)</p></td>
<td>0x61</td>
<td><p>An unsigned 8-bit integer value that specifies the logical
justification of the paragraph. The value MUST be one of those listed
following. Some of the values also correspond to the
<strong>ST_Jc</strong> enumeration values that are specified in
[ECMA-376] Part 1, Section 17.18.44 ST_Jc (Horizontal Alignment
Type).</p>
<blockquote>
<p><strong>0</strong></p>
<p><strong>St_Jc: left</strong></p>
<p>Paragraph is logical left justified</p>
<p><strong>1</strong></p>
<p><strong>St_Jc: center</strong></p>
<p>Paragraph is centered</p>
<p><strong>2</strong></p>
<p><strong>St_Jc: right</strong></p>
<p>Paragraph is logical right justified</p>
<p><strong>3</strong></p>
<p><strong>St_Jc: both</strong></p>
<p>Paragraph is justified to both right and left</p>
<p><strong>4</strong></p>
<p><strong>St_Jc:distribute</strong></p>
<p>Paragraph characters are distributed to fill the entire width of the
paragraph</p>
<p><strong>5</strong></p>
<p><strong>St_Jc: mediumKashida</strong></p>
<p>If the language is Arabic, the paragraph uses medium-length Kashida.
In other languages, text is justified with a medium character
compression ratio.</p>
<p><strong>6</strong></p>
<p>Paragraph is indented</p>
<p><strong>7</strong></p>
<p><strong>St_Jc: highKashida</strong></p>
<p>If the language is Arabic, the paragraph uses longer length Kashida.
In other languages, text is justified with a high character compression
ratio.</p>
<p><strong>8</strong></p>
<p><strong>St_Jc: lowKashida</strong></p>
<p>If the language is Arabic, the paragraph uses small length Kashida.
In other languages, text is justified with a high character compression
ratio.</p>
<p><strong>9</strong></p>
<p><strong>St_Jc:thaiDistribute</strong></p>
<p>If the language of the paragraph is Thai, the text is justified with
Thai distributed justification. In other languages, text is justified
with a low character compression ratio.</p>
</blockquote>
<p>The default is logical left justification.</p></td>
</tr>
<tr class="even">
<td><p>sprmPFNoAllowOverlap</p>
<p>(0x2462)</p></td>
<td>0x62</td>
<td>A Bool8 value that specifies whether the frame of this paragraph can
overlap with other frames. A value of 1 specifies that frames MUST NOT
overlap. By default, frames can overlap with other frames.</td>
</tr>
<tr class="odd">
<td><p>sprmPWall</p>
<p>(0x2664)</p></td>
<td>0x64</td>
<td><p>A Bool8 value that specifies whether the values of paragraph
properties are preserved for revision marking purposes until the
modifications are accepted or rejected by the user.</p>
<p>A value of 1 specifies that the property values were preserved. All
SPRMs that are encountered before the <strong>sprmPWall</strong> in the
property evaluation of the paragraph specify the state of properties
before revision marking was enabled, whereas all SPRMs following the
<strong>sprmPWall</strong> specify the property modifications that occur
after revision marking was enabled.</p>
<p>A value of 0 specifies that no values were preserved (overriding any
previously encountered sprmPWall SPRMs that specify the contrary).
Neither SPRMs that were encountered before the sprmPWall, nor subsequent
SPRMs (until another sprmPWall, if any), are treated in any special way
with regard to revision marking.</p>
<p>By default, property values are not preserved.</p></td>
</tr>
<tr class="even">
<td><p>sprmPIpgp</p>
<p>(0x6465)</p></td>
<td>0x65</td>
<td><p>An unsigned integer value that specifies the
PGPInfo.<strong>ipgpSelf</strong> value of the PGPInfo data that is
applied to this paragraph. The table depth of the paragraph (see
Overview of Tables) MUST match PGPInfo.<strong>itap</strong> unless the
paragraph is a table terminating mark, in which case
PGPInfo.<strong>itap</strong> MUST be 1 less than the paragraph table
depth.</p>
<p>PGPInfo.<strong>ipgpSelf</strong> values MUST NOT be applied in such
a way as to break the hierarchy that is implied by the PGPInfo
structures themselves. Given that the application of a particular
PGPInfo.<strong>ipgpSelf</strong> value implies the application of all
of the PGPInfo.<strong>ipgpParent</strong> values that are encountered
by ascending the PGPInfo chain, ensuring that all occurrences of any
PGPInfo.<strong>ipgpSelf</strong> are on adjacent paragraphs of the same
table depth ensures that the hierarchy is not broken.</p>
<p>By default, a paragraph has no associated PGPInfo.</p></td>
</tr>
<tr class="odd">
<td><p>sprmPCnf</p>
<p>(0xC666)</p></td>
<td>0x66</td>
<td><p>A <a href="#cnfoperand">CNFOperand</a> value that specifies
conditional paragraph formatting for a specific condition of a <a
href="#gt_3b7a61db-dd69-4fde-b53f-e445ddb47424"><strong>table
style</strong></a>. The <strong>grpprl</strong> member of the CNFOperand
value specifies the paragraph formatting properties and MUST NOT contain
any Sprms that are disallowed in the <strong>grpprlPapx</strong> member
of <a href="#upxpapx">UpxPapx</a>.</p>
<p>This sprm MUST only be specified within the
<strong>grpprlPapx</strong> member of a UpxPapx within a table style
definition (<a href="#lpstd">LPStd</a>).</p>
<p>By default, a table style definition does not include conditional
formatting.</p></td>
</tr>
<tr class="even">
<td><p>sprmPRsid</p>
<p>(0x6467)</p></td>
<td>0x67</td>
<td>An integer value that specifies a revision save ID, as specified in
[ECMA-376] Part 1, Section 17.15.1.70 rsid (Single Session Revision Save
ID), associated with paragraph formatting. If not present, then no
revision save ID is specified for this formatting.</td>
</tr>
<tr class="odd">
<td><p>sprmPIstdListPermute</p>
<p>(0xC669)</p></td>
<td>0x69</td>
<td>An SPPOperand value that has no effect and MUST be ignored.</td>
</tr>
<tr class="even">
<td><p>sprmPTableProps</p>
<p>(0x646B)</p></td>
<td>0x6B</td>
<td>An unsigned integer value that specifies a location in the Data
Stream. A PrcData structure begins at this offset and specifies
additional properties for the paragraph. The <strong>cbGrpprl</strong>
member of the referenced PrcData structure MUST NOT be less than 10. If
an application processes this PrcData structure, then it MUST NOT
process anymore Prl elements in the array that contained the
<strong>sprmPTableProps</strong> value. SprmPHugePapx and
<strong>sprmPTableProps</strong> values can refer to PrcData structures
containing each other, but the chain MUST eventually terminate in a
PrcData that contains neither sprmPHugePapx nor sprmPTableProps.</td>
</tr>
<tr class="odd">
<td><p>sprmPTIstdInfo</p>
<p>(0xC66C)</p></td>
<td>0x6C</td>
<td>A <a href="#ptistdinfooperand">PTIstdInfoOperand</a> value that has
no effect and MUST be ignored.</td>
</tr>
<tr class="even">
<td><p>sprmPFContextualSpacing</p>
<p>(0x246D)</p></td>
<td>0x6D</td>
<td>A Bool8 value that specifies whether contextual spacing is enabled
for this paragraph. A value of 0x01 specifies that any space before this
paragraph (sprmPDyaBefore) MUST be ignored if the preceding paragraph is
of the same <a
href="#gt_fb5b34b6-fc18-48d7-b50f-5c39d5c8bf0b"><strong>paragraph
style</strong></a> and any space after this paragraph (sprmPDyaAfter)
MUST be ignored if the following paragraph is of the same paragraph
style. By default, paragraphs do not use contextual spacing.</td>
</tr>
<tr class="odd">
<td><p>sprmPPropRMark</p>
<p>(0xC66F)</p></td>
<td>0x6F</td>
<td>A <a href="#proprmarkoperand">PropRMarkOperand</a> value that
specifies whether the paragraph has an associated property revision
mark, as well as its author and the date and time. By default,
paragraphs have no property revision marks.</td>
</tr>
<tr class="even">
<td><p>sprmPFMirrorIndents</p>
<p>(0x2470)</p></td>
<td>0x70</td>
<td>A Bool8 value that specifies whether the left and right indents that
are set for this paragraph are interpreted as inside and outside margins
for odd and even numbered pages. For specifications of the display
behavior, see [ECMA-376] Part 1, Section 17.3.1.18 mirrorIndents (use
Left/Right Indents as Inside/Outside Indents). By default, paragraph
indents are not swapped.</td>
</tr>
<tr class="odd">
<td><p>sprmPTtwo</p>
<p>(0x2471)</p></td>
<td>0x71</td>
<td><p>A 1-byte integer that specifies text wrapping options for a text
box when tight wrapping is set for the text box. This option is the same
as [ECMA-376] Part 1, Section 17.3.1.40 textboxTightWrap (Allow
Surrounding Paragraphs to Tight Wrap to Text Box Contents)</p>
<p>The value MUST be one of the following, which correspond to values
specified in [ECMA-376] Part 1, Section 17.18.92 ST_TextboxTightWrap
(Lines To Tight Wrap Within Text Box).</p>
<blockquote>
<p><strong>0x00</strong></p>
<p><strong>ST_TextboxTightWrap: none</strong></p>
<p>No lines of the paragraph allow the surrounding text to tightly wrap
around their edges.</p>
<p><strong>0x01</strong></p>
<p><strong>ST_TextboxTightWrap: allLines</strong></p>
<p>All lines of the paragraph allow the surrounding text to tightly wrap
to their edges.</p>
<p><strong>0x02</strong></p>
<p><strong>ST_TextboxTightWrap: firstAndLastLine</strong></p>
<p>Only the first and last lines of the paragraph allow the surrounding
text to tightly wrap around their edges.</p>
<p><strong>0x03</strong></p>
<p><strong>ST_TextboxTightWrap: firstLineOnly</strong></p>
<p>Only the first line of the paragraph allows the surrounding text to
tightly wrap around its edges.</p>
<p><strong>0x04</strong></p>
<p><strong>ST_TextboxTightWrap: lastLineOnly</strong></p>
<p>Only the last line of the paragraph allows the surrounding text to
tightly wrap around its edges.</p>
</blockquote>
<p>By default, the surrounding text is not allowed to tightly wrap to
the edges of the lines of a paragraph in a textbox.</p></td>
</tr>
</tbody>
</table>

### Table Properties

A [Prl](#prl) with a **sprm.sgc** of 5 modifies a table property.

The following table specifies the table property modifiers, including
the valid **sprm** values, their function, and the corresponding
**operand** type and meaning.

<table>
<colgroup>
<col style="width: 25%" />
<col style="width: 8%" />
<col style="width: 66%" />
</colgroup>
<thead>
<tr class="header">
<th>Sprm</th>
<th>ispmd</th>
<th>Operand</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>sprmTJc90</p>
<p>(0x5400)</p></td>
<td>0x00</td>
<td><p>An unsigned 16-bit integer value that specifies the physical
justification of the table. The valid values and their meanings are as
follows.</p>
<blockquote>
<p>0 - The table is <a
href="#gt_109a1037-0ae1-48da-8597-dc99be0a0aa8"><strong>physical
left</strong></a> justified.</p>
<p>1 - The table is centered.</p>
<p>2 - The table is <a
href="#gt_85b72f6e-f8a8-411b-bfaa-307e5a0b793d"><strong>physical
right</strong></a> justified.</p>
</blockquote>
<p>Tables do not have a default physical justification. Their default
justification is <a
href="#gt_ccc2ab6c-db9b-4c67-9b95-21ce79e7358d"><strong>logical
left</strong></a>.</p></td>
</tr>
<tr class="even">
<td><p>sprmTDxaLeft</p>
<p>(0x9601)</p></td>
<td>0x01</td>
<td><p>An <a href="#xas">XAS</a> value that, combined with
sprmTDxaGapHalf, specifies the location of the horizontal origin of the
table relative to the logical left margin. That is, the origin is the
logical left margin, indented by this value minus the value of
sprmTDxaGapHalf.</p>
<p>The actual logical left edge of the table can be offset from the
origin after also considering cell spacing, margins, and the line width
of the border.</p>
<p>The default logical left indent is 0.</p></td>
</tr>
<tr class="odd">
<td><p>sprmTDxaGapHalf</p>
<p>(0x9602)</p></td>
<td>0x02</td>
<td><p>An XAS value that specifies the average width, in <a
href="#gt_4b82472c-103d-4eff-a07e-6a0f784e3382"><strong>twips</strong></a>,
between the left and right default cell margins for the first cell in
the row. The actual cell margins are stored in sprmTCellPaddingDefault.
This value is not used to layout cell contents within a cell. Rather,
this value is used as an offset to the value in sprmTDxaLeft when
positioning the logical left outer edge of the table. This value MUST be
non-negative.</p>
<p>By default, no offset is applied to sprmTDxaLeft when positioning the
table.</p></td>
</tr>
<tr class="even">
<td><p>sprmTFCantSplit90</p>
<p>(0x3403)</p></td>
<td>0x03</td>
<td><p>A <a href="#bool8">Bool8</a> value. If this property is "true"
(0x01) then table rows SHOULD NOT<span id="Appendix_A_Target_150"
class="anchor"></span><a href="#Appendix_A_150">&lt;150&gt;</a> be split
across page breaks. By default, rows can be split across page breaks.
Whenever cells are merged this property SHOULD<span
id="Appendix_A_Target_151" class="anchor"></span><a
href="#Appendix_A_151">&lt;151&gt;</a> be set with a value of 0x01 for
each row involved in the merge.</p>
<p>This property SHOULD<span id="Appendix_A_Target_152"
class="anchor"></span><a href="#Appendix_A_152">&lt;152&gt;</a> be
ignored and sprmTFCantSplit SHOULD<span id="Appendix_A_Target_153"
class="anchor"></span><a href="#Appendix_A_153">&lt;153&gt;</a> be used
instead.</p></td>
</tr>
<tr class="odd">
<td><p>sprmTTableHeader</p>
<p>(0x3404)</p></td>
<td>0x04</td>
<td><p>A Bool8 value that specifies that the current table row is a
header row. If the value is 0x01 but sprmTTableHeader is not applied
with a value of 0x01 for a previous row in the same table, then this
property MUST be ignored.</p>
<p>By default, a table row is not a header row.</p></td>
</tr>
<tr class="even">
<td><p>sprmTTableBorders80</p>
<p>(0xD605)</p></td>
<td>0x05</td>
<td>A <a href="#tablebordersoperand80">TableBordersOperand80</a> value
that specifies border information for the cells in a table row. By
default, table rows have no borders.</td>
</tr>
<tr class="odd">
<td><p>sprmTDyaRowHeight</p>
<p>(0x9407)</p></td>
<td>0x07</td>
<td><p>A <a href="#yas">YAS</a> value that specifies the height of the
row.</p>
<p>If this value is zero, the height of a row is derived from the height
of the contents of the cells that the row contains.</p>
<p>If this value is positive, then the value is treated as "at least",
meaning the row is larger if the contents need more space.</p>
<p>If this value is negative, then the absolute value is used, and the
size is treated as "exact". The row does not grow to accommodate large
contents.</p>
<p>By default, table row heights are derived from the heights of the
contents of the cells in the row.</p></td>
</tr>
<tr class="even">
<td><p>sprmTDefTable</p>
<p>(0xD608)</p></td>
<td>0x08</td>
<td><p>A <a href="#tdeftableoperand">TDefTableOperand</a> value that
specifies the number of columns in the table row, the width of each
column, border attributes, and a variety of other settings.</p>
<p>By default, a table row has zero columns. In order for a table to
have columns, the file MUST provide a sprmTDefTable or a sprmTInsert for
each table row.</p></td>
</tr>
<tr class="odd">
<td><p>sprmTDefTableShd80</p>
<p>(0xD609)</p></td>
<td>0x09</td>
<td><p>A <a href="#deftableshd80operand">DefTableShd80Operand</a> value
that specifies the default shading applied to each cell in a row. By
default, no cells are shaded.</p>
<p>If the <a href="#Section_fe6610529c884ae1aec444799b2b4777">nFib</a>
value is greater than 0x00D9 and the application can interpret <a
href="#gt_3b7a61db-dd69-4fde-b53f-e445ddb47424"><strong>table
styles</strong></a>, then this Sprm MUST be ignored.</p></td>
</tr>
<tr class="even">
<td><p>sprmTTlp</p>
<p>(0x740A)</p></td>
<td>0x0A</td>
<td><p>A <a href="#tlp">TLP</a> structure that specifies the table style
options for this table.</p>
<p>By default, tables have no table style associated with them and all
optional table styles are disabled.</p></td>
</tr>
<tr class="odd">
<td><p>sprmTFBiDi</p>
<p>(0x560B)</p></td>
<td>0x0B</td>
<td><p>A <a href="#bool16">Bool16</a> value that specifies whether this
table is <a
href="#gt_91359688-7863-4e88-b507-f57b3dada5ec"><strong>right-to-left</strong></a>.
A table is right-to-left if either this <a href="#sprm">Sprm</a> or
sprmTFBiDi90 is set to "true".</p>
<p>By default, tables are <a
href="#gt_b8c262f8-6c09-457a-9b68-4bf3a08ab067"><strong>left-to-right</strong></a>.</p></td>
</tr>
<tr class="even">
<td><p>sprmTDefTableShd3rd</p>
<p>(0xD60C)</p></td>
<td>0x0C</td>
<td><p>A <a href="#deftableshdoperand">DefTableShdOperand</a> that
specifies the default shading for cells 45 to 63 in the row, or all
remaining cells in the row beginning with cell 45 if the row contains
fewer than 63 cells. <strong>cb</strong> MUST NOT exceed 190 and
<strong>rgShd</strong> MUST NOT exceed 19 elements. Non-shaded cells in
<strong>rgShd</strong> are set to <strong>ShdAuto</strong>. By default,
no cells are shaded. Cells 1 – 22 are shaded by sprmTDefTableShd, and
cells 23 – 44 are shaded by sprmTDefTableShd2nd.</p>
<p>If the nFib value is greater than 0x00D9 and the application can
interpret table styles, then this <strong>Sprm</strong> MUST be
ignored.</p></td>
</tr>
<tr class="odd">
<td><p>sprmTPc</p>
<p>(0x360D)</p></td>
<td>0x0D</td>
<td><p>A <a href="#positioncodeoperand">PositionCodeOperand</a>
structure that specifies the origin that is used to calculate the table
position when it is absolutely positioned.</p>
<p>By default, tables are not absolutely positioned. By default, when a
table is absolutely positioned, its position is relative to the top
margin of the page, and to the left edge of the current column.</p></td>
</tr>
<tr class="even">
<td><p>sprmTDxaAbs</p>
<p>(0x940E)</p></td>
<td>0x0E</td>
<td><p>A <a href="#xas_plusone">XAS_plusOne</a> value that specifies the
horizontal position of the table relative to the horizontal anchor of
the table. See sprmTPc for the table anchor.</p>
<p>Except for the reserved values that are listed in the following
table, the sprmTDxaAbs specifies the position of the physical left
origin of the table. It MUST be less than or equal to 31681 (22 inches)
and greater than or equal to -31679 (-22 inches). Furthermore, after
accounting for the basis specified in sprmTPc, the absolute position
MUST be greater than or equal to 0 inches.</p>
<p>Several values of sprmTDxaAbs have special meanings as specified by
<a href="https://go.microsoft.com/fwlink/?LinkId=200054">[ECMA-376]</a>
Part 1, Section 22.9.2.18. These values are specified as follows.</p>
<blockquote>
<p>0x0000 - Left aligned</p>
<p>0xFFFC - Centered</p>
<p>0xFFF8 - Right aligned</p>
<p>0xFFF4 - Inside</p>
<p>0xFFF0 - Outside</p>
</blockquote>
<p>By default, the relative horizontal position is left
aligned.</p></td>
</tr>
<tr class="odd">
<td><p>sprmTDyaAbs</p>
<p>(0x940F)</p></td>
<td>0x0F</td>
<td><p>A <a href="#yas_plusone">YAS_plusOne</a> value that specifies
downward vertical position relative to the vertical anchor of the table.
See sprmTPc for the table anchor. If the value is any of the those that
follow, the operand specifies a special descriptive relative position.
The meanings that are provided correspond to values that are defined in
[ECMA-376] Part 1, Section 22.9.2.20 ST_YAlign (Vertical Alignment
Location).</p>
<blockquote>
<p>0x0000 - inline</p>
<p>0xFFFC - top</p>
<p>0xFFF8 - center</p>
<p>0xFFF4 - bottom</p>
<p>0xFFF0 - inside</p>
<p>0xFFEC - outside</p>
</blockquote>
<p>By default, the relative vertical position is 0x0000
(inline).</p></td>
</tr>
<tr class="even">
<td><p>sprmTDxaFromText</p>
<p>(0x9410)</p></td>
<td>0x10</td>
<td>An <a href="#xas_nonneg">XAS_nonNeg</a> value that specifies the
minimum horizontal distance between the physical left edge of the table
and the physical right edge of the text that wraps around the table. By
default, the minimum horizontal distance between a table and wrapping
text is 0 twips.</td>
</tr>
<tr class="odd">
<td><p>sprmTDyaFromText</p>
<p>(0x9411)</p></td>
<td>0x11</td>
<td>A <a href="#yas_nonneg">YAS_nonNeg</a> value that specifies the
minimum vertical distance between the top edge of the table and the
bottom edge of text that wraps around the table. By default, the minimum
vertical distance between a table and wrapping text is 0 twips.</td>
</tr>
<tr class="even">
<td><p>sprmTDefTableShd</p>
<p>(0xD612)</p></td>
<td>0x12</td>
<td><p>A DefTableShdOperand value that specifies the default shading for
cells 1 – 22 in the row, or all cells in the row if the row contains
fewer than 22 cells. Non-shaded cells in <strong>rgShd</strong> are set
to <strong>ShdAuto</strong>. By default, no cells are shaded. Cells 23 –
44 are shaded by sprmTDefTableShd2nd, and cells 45 – 63 are shaded by
sprmTDefTableShd3rd.</p>
<p>If nFib is greater than 0x00D9 and the application understands table
styles, then this Sprm MUST be ignored.</p></td>
</tr>
<tr class="odd">
<td><p>sprmTTableBorders</p>
<p>(0xD613)</p></td>
<td>0x13</td>
<td>A <a href="#tablebordersoperand">TableBordersOperand</a> value that
specifies the borders for this row unless modified by other Sprms
applied to the cells. By default, table rows have no borders.</td>
</tr>
<tr class="even">
<td><p>sprmTTableWidth</p>
<p>(0xF614)</p></td>
<td>0x14</td>
<td><p>An <a href="#ftswwidth_table">FtsWWidth_Table</a> structure that
specifies the preferred total width of the table of which this row is a
part.</p>
<p>By default, tables have no preferred width.</p></td>
</tr>
<tr class="odd">
<td><p>sprmTFAutofit</p>
<p>(0x3615)</p></td>
<td>0x15</td>
<td>A Bool8 value that specifies whether the table column widths are to
be automatically resized to best fit the contents of the whole table. By
default, table column widths are not automatically resized.</td>
</tr>
<tr class="even">
<td><p>sprmTDefTableShd2nd</p>
<p>(0xD616)</p></td>
<td>0x16</td>
<td><p>A DefTableShdOperand that specifies the default shading for cells
23 – 44 in the row, or all remaining cells in the row beginning with
cell 23 if the row contains fewer than 44 cells. Non-shaded cells in
<strong>rgShd</strong> are set to <strong>ShdAuto</strong>. By default,
no cells are shaded. Cells 1 – 22 are shaded by sprmTDefTableShd, and
cells 45 – 63 are shaded by sprmTDefTableShd3rd.</p>
<p>If nFib is greater than 0x00D9 and the application understands table
styles, then this Sprm MUST be ignored.</p></td>
</tr>
<tr class="odd">
<td><p>sprmTWidthBefore</p>
<p>(0xF617)</p></td>
<td>0x17</td>
<td><p>An <a href="#ftswwidth_tablepart">FtsWWidth_TablePart</a>
structure that specifies the preferred additional leading indent of the
first cell of the row, relative to the leading edge of the table as a
whole.</p>
<p>By default, table rows have no preferred additional leading
indent.</p></td>
</tr>
<tr class="even">
<td><p>sprmTWidthAfter</p>
<p>(0xF618)</p></td>
<td>0x18</td>
<td><p>An FtsWWidth_TablePart structure that specifies the preferred
trailing indent following the last cell of the row. The indent is inward
from the outer edge of the table as a whole.</p>
<p>By default, table rows have no preferred additional trailing
indent.</p></td>
</tr>
<tr class="odd">
<td><p>sprmTFKeepFollow</p>
<p>(0x3619)</p></td>
<td>0x19</td>
<td>A Bool8 value that specifies whether page breaks are avoided between
the rows of this table, if possible. By default, tables are allowed to
have page breaks.</td>
</tr>
<tr class="even">
<td><p>sprmTBrcTopCv</p>
<p>(0xD61A)</p></td>
<td>0x1A</td>
<td>A <a href="#brccvoperand">BrcCvOperand</a> value that specifies the
color of the top border for each cell in a table row. By default, each
color is <strong>cvAuto</strong>.</td>
</tr>
<tr class="odd">
<td><p>sprmTBrcLeftCv</p>
<p>(0xD61B)</p></td>
<td>0x1B</td>
<td>A BrcCvOperand value that specifies the color of the logical left
border for each cell in a table row. By default, each color is
<strong>cvAuto</strong>.</td>
</tr>
<tr class="even">
<td><p>sprmTBrcBottomCv</p>
<p>(0xD61C)</p></td>
<td>0x1C</td>
<td>A BrcCvOperand value that specifies the color of the bottom border
for each cell in a table row. By default, each color is
<strong>cvAuto</strong>.</td>
</tr>
<tr class="odd">
<td><p>sprmTBrcRightCv</p>
<p>(0xD61D)</p></td>
<td>0x1D</td>
<td>A BrcCvOperand value that specifies the color of the logical right
border for each cell in a table row. By default, each color is
<strong>cvAuto</strong>.</td>
</tr>
<tr class="even">
<td><p>sprmTDxaFromTextRight</p>
<p>(0x941E)</p></td>
<td>0x1E</td>
<td>An XAS_nonNeg value that specifies the minimum horizontal distance
between the physical right edge of the table and the physical left edge
of the text that wraps around the table. By default, the minimum
horizontal distance between a table and wrapping text is 0 twips.</td>
</tr>
<tr class="odd">
<td><p>sprmTDyaFromTextBottom</p>
<p>(0x941F)</p></td>
<td>0x1F</td>
<td>A YAS_nonNeg value that specifies the minimum vertical distance
between the bottom edge of the table and the top edge of text that wraps
around the table. By default, the minimum vertical distance between a
table and wrapping text is 0 twips.</td>
</tr>
<tr class="even">
<td><p>sprmTSetBrc80</p>
<p>(0xD620)</p></td>
<td>0x20</td>
<td>A <a href="#tablebrc80operand">TableBrc80Operand</a> value that
specifies the borders of a set of cells in the table row. By default,
cells have no borders.</td>
</tr>
<tr class="odd">
<td><p>sprmTInsert</p>
<p>(0x7621)</p></td>
<td>0x21</td>
<td><p>A <a href="#tinsertoperand">TInsertOperand</a> value that
specifies a range of new table cell definitions to insert into the table
row. The new cells have properties that are defined by the table style
of the row.</p>
<p>Each table row MUST specify at least one cell using sprmTInsert or
sprmTDefTable, or a combination thereof.</p></td>
</tr>
<tr class="even">
<td><p>sprmTDelete</p>
<p>(0x5622)</p></td>
<td>0x22</td>
<td>An <a href="#itcfirstlim">ItcFirstLim</a> value that specifies a
range of table cell definitions to delete from the table row. These cell
definitions MUST have been inserted by a previous application of
sprmTInsert or sprmTDefTable. The table row MUST have at least one cell
remaining after the deletion.</td>
</tr>
<tr class="odd">
<td><p>sprmTDxaCol</p>
<p>(0x7623)</p></td>
<td>0x23</td>
<td>A <a href="#tdxacoloperand">TDxaColOperand</a> value that specifies
the width of a range of cells in this table. By default, the column
width is specified when the column is created in either sprmTInsert or
sprmTDefTable.</td>
</tr>
<tr class="even">
<td><p>sprmTMerge</p>
<p>(0x5624)</p></td>
<td>0x24</td>
<td><p>An ItcFirstLim structure that specifies a set of cells in the
current table row that are to be merged. The first cell in the range is
considered the primary cell, and its contents and formatting flow into
the layout region of the other cells. The contents and formatting of the
other cells are not applied.</p>
<p>By default, cells are not merged.</p></td>
</tr>
<tr class="odd">
<td><p>sprmTSplit</p>
<p>(0x5625)</p></td>
<td>0x25</td>
<td><p>An ItcFirstLim structure that specifies a set of cells in the
current table row that are not to be merged. All cells in the specified
range render their own contents and formatting. Neighboring cells that
are set to merge do not flow into these cells.</p>
<p>The function of this <a
href="#Section_4fae38be499347d2b82c8f32e4ab9ff0">Sprm</a> is to undo the
effects of sprmTMerge. When applied to cells that are not merged,
nothing is changed. By default, cells are not merged.</p></td>
</tr>
<tr class="even">
<td><p>sprmTTextFlow</p>
<p>(0x7629)</p></td>
<td>0x29</td>
<td><p>A <a href="#cellrangetextflow">CellRangeTextFlow</a> value that
specifies a set of cells in the current table row and the text flow
model for each cell.</p>
<p>By default, the text flow of each cell in the row is
<strong>grpfTFlrtb</strong>.</p></td>
</tr>
<tr class="odd">
<td><p>sprmTVertMerge</p>
<p>(0xD62B)</p></td>
<td>0x2B</td>
<td><p>A <a href="#vertmergeoperand">VertMergeOperand</a> value that
specifies a cell in the current row, and whether that cell is vertically
merged with the cell above or below it.</p>
<p>By default, cells are not merged with other cells.</p></td>
</tr>
<tr class="even">
<td><p>sprmTVertAlign</p>
<p>(0xD62C)</p></td>
<td>0x2C</td>
<td><p>A <a href="#cellrangevertalign">CellRangeVertAlign</a> value that
specifies a set of cells in the current table row and the vertical
alignment of cell contents in each cell.</p>
<p>By default, cell contents are vertically aligned to the top of the
cell.</p></td>
</tr>
<tr class="odd">
<td><p>sprmTSetShd</p>
<p>(0xD62D)</p></td>
<td>0x2D</td>
<td><p>A <a href="#tableshadeoperand">TableShadeOperand</a> value that
specifies a set of cells in a table row and the background shading for
each cell.</p>
<p>If the nFib value is greater than 0x00D9 and the application can
interpret table styles, this Sprm MUST be ignored.</p>
<p>By default, the background shading of table cells is
<strong>ShdAuto</strong>.</p></td>
</tr>
<tr class="even">
<td><p>sprmTSetShdOdd</p>
<p>(0xD62E)</p></td>
<td>0x2E</td>
<td><p>A TableShadeOperand value that specifies a set of cells in a
table row and the background shading for odd numbered cells in that set.
That is, if the set of cells is 0 through 5, then this sets the
background shading for cells 0, 2 and 4. To set background shading for
even numbered cells, specify a set of cells starting on the even
numbered cell.</p>
<p>If nFib is greater than 0x00D9 and the application can interpret
table styles, then this Sprm MUST be ignored.</p>
<p>By default, the background shading of table cells is
<strong>ShdAuto</strong>.</p></td>
</tr>
<tr class="odd">
<td><p>sprmTSetBrc</p>
<p>(0xD62F)</p></td>
<td>0x2F</td>
<td>A <a href="#tablebrcoperand">TableBrcOperand</a> value that
specifies the border type of a set of cells in a table row. By default,
the border type is inherited from the table border properties.</td>
</tr>
<tr class="even">
<td><p>sprmTCellPadding</p>
<p>(0xD632)</p></td>
<td>0x32</td>
<td>A <a href="#cssaoperand">CSSAOperand</a> value that specifies the <a
href="#gt_30232e45-c2f5-4d92-854c-74ffdea1e163"><strong>cell
margin</strong></a> for one or more cell sides.
<strong>cssa.ftsWidth</strong> MUST be ftsNil (0x00) or ftsDxa (0x03).
If <strong>cssa.ftsWidth</strong> is ftsDxa (0x03), then
<strong>cssa.wWidth</strong> MUST be nonnegative and MUST NOT exceed
31680. By default, cell margins are specified by
sprmTCellPaddingDefault.</td>
</tr>
<tr class="odd">
<td><p>sprmTCellSpacingDefault</p>
<p>(0xD633)</p></td>
<td>0x33</td>
<td>A CSSAOperand that specifies the <a
href="#gt_4a64964b-c1e8-41b3-b3da-e9866f5227d2"><strong>cell
spacing</strong></a> for each cell in the entire row.
<strong>cssa.itc.itcFirst</strong> MUST be 0,
<strong>cssa.itc.itcLim</strong> MUST be 1, <strong>cssa.grfbrc</strong>
MUST be fbrcSidesOnly (0x0F), <strong>cssa.ftsWidth</strong> MUST be
ftsNil (0x00) or ftsDxa (0x03) or ftsDxaSys (0x13), and
<strong>cssa.wWidth</strong> MUST be nonnegative and MUST NOT exceed
15840 (11"). By default, cells do not have cell spacing.</td>
</tr>
<tr class="even">
<td><p>sprmTCellPaddingDefault</p>
<p>(0xD634)</p></td>
<td>0x34</td>
<td><p>A CSSAOperand that specifies the cell margin for one or more cell
sides for each cell in the entire row.
<strong>cssa.itc.itcFirst</strong> MUST be 0,
<strong>cssa.itc.itcLim</strong> MUST be 1,
<strong>cssa.ftsWidth</strong> MUST be ftsNil (0x00) or ftsDxa (0x03),
and <strong>cssa.wWidth</strong> MUST be nonnegative and MUST NOT exceed
31680.</p>
<p>By default, rows use two sprmTCellPaddingDefault properties: the
first to specify left and right cell margins, and the second to specify
top and bottom cell margins. By default, left and right cell margins use
the following <a href="#cssa">CSSA</a>.</p>
<blockquote>
<p><strong>itcFirst</strong>: 0</p>
<p><strong>itcLim</strong>: 1</p>
<p><strong>grfbrc</strong>: fbrcLeft | fbrcRight (0x0A)</p>
<p><strong>ftsWidth</strong>: ftsDxa (0x03)</p>
<p><strong>wWidth</strong>: 108</p>
</blockquote>
<p>By default, top and bottom cell margins use the following CSSA.</p>
<blockquote>
<p><strong>itcFirst</strong>: 0</p>
<p><strong>itcLim</strong>: 1</p>
<p><strong>grfbrc</strong>: fbrcTop | fbrcBottom (0x05)</p>
<p><strong>ftsWidth</strong>: ftsDxa (0x03)</p>
<p><strong>wWidth</strong>: 0</p>
</blockquote></td>
</tr>
<tr class="odd">
<td><p>sprmTCellWidth</p>
<p>(0xD635)</p></td>
<td>0x35</td>
<td>A <a href="#tablecellwidthoperand">TableCellWidthOperand</a> value
that specifies the preferred width of one or more table cells. By
default, table cells do not have a preferred width.</td>
</tr>
<tr class="even">
<td><p>sprmTFitText</p>
<p>(0xF636)</p></td>
<td>0x36</td>
<td><p>A <a href="#cellrangefittext">CellRangeFitText</a> value that
specifies a set of cells in a table row and whether their contents are
to be stretched or compressed to exactly fill their widths.</p>
<p>By default the contents of table cells are not stretched or
compressed.</p></td>
</tr>
<tr class="odd">
<td><p>sprmTFCellNoWrap</p>
<p>(0xD639)</p></td>
<td>0x39</td>
<td><p>A <a href="#cellrangenowrap">CellRangeNoWrap</a> value that
specifies a set of cells in a table row and whether their contents wrap
over multiple lines.</p>
<p>By default, the contents of table cells wrap over multiple
lines.</p></td>
</tr>
<tr class="even">
<td><p>sprmTIstd</p>
<p>(0x563A)</p></td>
<td>0x3A</td>
<td><p>An unsigned integer value that specifies the
<strong>istd</strong> value of a table style to apply.</p>
<p>To apply the <strong>istd</strong> value, fetch the complete set of
table properties from that style (see <a
href="#Section_4e918665c4da41d8aed5615c2e96c216">Applying Properties</a>
for instructions.) Apply those properties to the current table, while
preserving the previous values of the following:</p>
<ul>
<li><p>Whether the values of table properties have been preserved for
revision marking purposes (for example, by sprmTWall).</p></li>
<li><p>Whether the table row has an associated <a
href="#gt_4d5c1e95-df26-408b-a964-4a6cba5d2239"><strong>property
revision mark</strong></a>, as well as its author and the date and time
(for example, by sprmTPropRMark).</p></li>
<li><p>Whether this table is right-to-left (for example, by
sprmTFBiDi).</p></li>
<li><p>The revision save ID that is associated with table formatting
(sprmTRsid).</p></li>
<li><p>The PositionCodeOperand structure that specifies the origin used
to calculate the table position when it is absolutely positioned (for
example, by sprmTPc).</p></li>
<li><p>The horizontal position of the table relative to the horizontal
anchor of the table (for example, by sprmTDxaAbs).</p></li>
<li><p>The downward vertical position relative to the vertical anchor of
the tables (for example, by sprmTDyaAbs).</p></li>
<li><p>The minimum horizontal distance between the physical left edge of
the table and the physical right edge of text that wraps around the
table (for example, by sprmTDxaFromText).</p></li>
</ul>
<ul>
<li><p>The minimum vertical distance between the top edge of the table
and the bottom edge of text that wraps around the table (for example, by
sprmTDyaFromText).</p></li>
<li><p>The minimum horizontal distance between the physical right edge
of the table and the physical left edge of text that wraps around the
table (for example, by sprmTDxaFromTextRight).</p></li>
<li><p>The minimum vertical distance between the bottom edge of the
table and the top edge of text that wraps around the table (for example,
by sprmTDyaFromTextBottom).</p></li>
<li><p>The average width between the left and right default cell margins
for the first cell in the row (for example, by
sprmTDxaGapHalf).</p></li>
<li><p>The height of the row (for example, by
sprmTDyaRowHeight).</p></li>
<li><p>The preferred total width of the table (for example, by
sprmTTableWidth).</p></li>
<li><p>Whether the table column widths are to be automatically resized
to best fit the contents of the whole table (for example, by
sprmTFAutofit).</p></li>
<li><p>The <strong>grfatl</strong> member of the TLP structure that
specifies the settings that are used when the current table row was last
auto-formatted (for example, by sprmTTlp).</p></li>
</ul>
<p>This sprm also specifies that the current table has the table style
that is specified by this <strong>istd</strong>. When computing
paragraph or character properties inside the table, the current table
style needs to be taken into account (see Applying Properties). When
sprmTIstd is applied, the paragraph and character properties of the text
within the table need to be recomputed.</p>
<p>If the <strong>istd</strong> refers to an empty or non-existent
style, or a style of a different type, a later Prl such as sprmTIstd
MUST change the <strong>istd</strong> to a valid value. Applying an
<strong>istd</strong> value that refers to an empty or nonexistent
style, or a style of a different type, is equivalent to applying a
sprmTIstd with an <strong>istd</strong> value of 0x000B (the
default).</p></td>
</tr>
<tr class="odd">
<td><p>sprmTCellPaddingStyle</p>
<p>(0xD63E)</p></td>
<td>0x3E</td>
<td>A CSSAOperand value that specifies the cell margin that is applied
to one or more cell sides for each cell in the entire row defined by a
Table style. <strong>cssa.itc.itcFirst</strong> MUST be 0,
<strong>cssa.itc.itcLim</strong> MUST be 1,
<strong>cssa.ftsWidth</strong> MUST be ftsDxa (0x03) and
<strong>cssa.wWidth</strong> MUST be nonnegative and MUST NOT exceed
31680. By default, cell margins are set as specified by
sprmTCellPaddingDefault.</td>
</tr>
<tr class="even">
<td><p>sprmTCellFHideMark</p>
<p>(0xD642)</p></td>
<td>0x42</td>
<td>A <a href="#cellhidemarkoperand">CellHideMarkOperand</a> that
specifies that table cell content is rendered with no height if all
cells in the row are empty; however, cells have a visible height if they
have nonzero cell borders, cell margins, or cell spacing. By default,
cell heights are rendered based on the paragraph and character
properties of the cell, regardless of whether they contain content.</td>
</tr>
<tr class="odd">
<td><p>sprmTSetShdTable</p>
<p>(0xD660)</p></td>
<td>0x60</td>
<td>A <a href="#shdoperand">SHDOperand</a> value that specifies the
background shading for the entire table. By default, tables are not
shaded.</td>
</tr>
<tr class="even">
<td><p>sprmTWidthIndent</p>
<p>(0xF661)</p></td>
<td>0x61</td>
<td><p>An <a href="#ftswwidth_indent">FtsWWidth_Indent</a> structure
that specifies the preferred leading indent of the table where the row
resides.</p>
<p>By default, tables have no preferred indent.</p></td>
</tr>
<tr class="odd">
<td><p>sprmTCellBrcType</p>
<p>(0xD662)</p></td>
<td>0x62</td>
<td>A <a href="#tcellbrctypeoperand">TCellBrcTypeOperand</a> value that
specifies the border type for the first several consecutive cells in a
table row. By default, the border type is inherited from the table style
of the whole table.</td>
</tr>
<tr class="even">
<td><p>sprmTFBiDi90</p>
<p>(0x5664)</p></td>
<td>0x64</td>
<td><p>A Bool16 value that specifies whether this table is
right-to-left. A table is right-to-left if either this Sprm or
sprmTFBiDi is set to true.</p>
<p>By default, tables are left-to-right.</p></td>
</tr>
<tr class="odd">
<td><p>sprmTFNoAllowOverlap</p>
<p>(0x3465)</p></td>
<td>0x65</td>
<td>A Bool8 value that specifies whether the table is allowed to overlap
other tables. A value of 0x01 specifies that the table is not allowed to
overlap. By default, tables are allowed to overlap with other
tables.</td>
</tr>
<tr class="even">
<td><p>sprmTFCantSplit</p>
<p>(0x3466)</p></td>
<td>0x66</td>
<td>A Bool8 value. If this property is "true" (1), table rows MUST NOT
be split across page breaks. By default, rows can be split across page
breaks.</td>
</tr>
<tr class="odd">
<td><p>sprmTPropRMark</p>
<p>(0xD667)</p></td>
<td>0x67</td>
<td><p>A <a href="#proprmarkoperand">PropRMarkOperand</a> that specifies
whether the table row has an associated property revision mark, as well
as its author and date/time.</p>
<p>By default, table rows have no property revision marks.</p></td>
</tr>
<tr class="even">
<td><p>sprmTWall</p>
<p>(0x3668)</p></td>
<td>0x68</td>
<td><p>A Bool8 value that specifies whether the values of table
properties are preserved for revision marking purposes until the
modifications are accepted or rejected by the user.</p>
<p>A value of 1 specifies that the values of properties are preserved.
All SPRMs encountered before the sprmTWall in the property evaluation of
the table row specify the state of properties before revision marking
was enabled, whereas all SPRMs following the sprmTWall specify the
property modifications that occurred afterwards.</p>
<p>A value of 0 specifies that no values are preserved (overriding any
previously encountered sprmTWall SPRMs that specify the contrary).
Neither SPRMs encountered before the sprmTWall, nor subsequent SPRMs
(until another sprmTWall, if any), are treated in any special way with
regard to revision marking.</p>
<p>By default, property values are not preserved.</p></td>
</tr>
<tr class="odd">
<td><p>sprmTIpgp</p>
<p>(0x7469)</p></td>
<td>0x69</td>
<td><p>An unsigned integer value that specifies the <a
href="#pgpinfo">PGPInfo</a>.<strong>ipgpSelf</strong> value of the
PGPInfo data to be applied to this table row. The table depth of the
table row (see <a
href="#Section_5b45f0e777604fdbaf880146de2feb4c">Overview of Tables</a>)
MUST be 1 greater than PGPInfo.<strong>itap</strong>.</p>
<p><strong>ipgpSelf</strong> values MUST NOT be applied in such a way as
to break the hierarchy that is implied by the PGPInfo structures
themselves. Given that the application of a particular
PGPInfo.<strong>ipgpSelf</strong> value implies the application of all
of the PGPInfo.<strong>ipgpParent</strong> values encountered ascending
the PGPInfo chain, then ensuring that all occurrences of any
PGPInfo.<strong>ipgpSelf</strong> are on adjacent rows of the same table
depth or paragraphs of one table depth less than an adjacent row ensures
that the hierarchy is not broken.</p>
<p>There MUST be a corresponding <a
href="#paragraph-properties">sprmPIpgp</a> with the same
PGPInfo.<strong>ipgpSelf</strong> value applied to the table terminating
mark of this row (See Overview of Tables).</p>
<p>By default, a table row has no associated PGPInfo.</p></td>
</tr>
<tr class="even">
<td><p>sprmTCnf</p>
<p>(0xD66A)</p></td>
<td>0x6A</td>
<td><p>A <a href="#cnfoperand">CNFOperand</a> that specifies conditional
table formatting for a specific condition of a table style. The
<strong>grpprl</strong> member of CNFOperand specifies the
table/cell/row formatting properties and MUST NOT contain any Sprms that
are disallowed in the <strong>grpprlTapx</strong> member of <a
href="#upxtapx">UpxTapx</a>, with the exception of the following Sprms
that are allowed:</p>
<ul>
<li><p>sprmTCellBrcTopStyle</p></li>
<li><p>sprmTCellBrcBottomStyle</p></li>
<li><p>sprmTCellBrcLeftStyle</p></li>
<li><p>sprmTCellBrcRightStyle</p></li>
<li><p>sprmTCellBrcInsideHStyle</p></li>
<li><p>sprmTCellBrcInsideVStyle</p></li>
</ul>
<p>This sprm MUST only be specified within the
<strong>grpprlTapx</strong> member of a UpxTapx within a table style
definition (<a href="#lpstd">LPStd</a>).</p>
<p>By default, a table style definition does not include conditional
formatting.</p></td>
</tr>
<tr class="odd">
<td><p>sprmTDefTableShdRaw</p>
<p>(0xD670)</p></td>
<td>0x70</td>
<td>A DefTableShdOperand value that specifies the default shading for
cells 1 to 22 in the row, or all cells in the row if the row contains
fewer than 22 cells. If a cell is set to ShdAuto in
<strong>rgShd</strong>, the cell is not shaded. If a cell is set to
ShdNil in <strong>rgShd</strong>, the cell is shaded according to the
table style. By default, cells are shaded according to the table style.
Cells 23 to 44 are shaded by sprmTDefTableShdRaw2nd, and cells 45 to 63
are shaded by sprmTDefTableShdRaw3rd.</td>
</tr>
<tr class="even">
<td><p>sprmTDefTableShdRaw2nd</p>
<p>(0xD671)</p></td>
<td>0x71</td>
<td>A DefTableShdOperand value that specifies the default shading for
cells 23 to 44 in the row, or all remaining cells in the row beginning
with cell 23 if the row contains fewer than 44 cells. If a cell is set
to ShdAuto in <strong>rgShd</strong>, the cell is not shaded. If a cell
is set to ShdNil in <strong>rgShd</strong>, the cell is shaded according
to the table style. By default, cells are shaded according to the table
style. Cells 1 to 22 are shaded by sprmTDefTableShdRaw, and cells 45 to
63 are shaded by sprmTDefTableShdRaw3rd.</td>
</tr>
<tr class="odd">
<td><p>sprmTDefTableShdRaw3rd</p>
<p>(0xD672)</p></td>
<td>0x72</td>
<td>A DefTableShdOperand that specifies the default shading for cells 45
to 63 in the row, or all remaining cells in the row beginning with cell
45 if the row contains fewer than 63 cells. <strong>cb</strong> MUST NOT
exceed 190 and <strong>rgShd</strong> MUST NOT exceed 19 elements. If a
cell is set to ShdAuto in <strong>rgShd</strong>, the cell is not
shaded. If a cell is set to ShdNil in <strong>rgShd</strong>, the cell
is shaded according to the table style. By default, cells are shaded
according to the table style. Cells 1 to 22 are shaded by
sprmTDefTableShdRaw, and cells 23 to 44 are shaded by
sprmTDefTableShdRaw2nd.</td>
</tr>
<tr class="even">
<td><p>sprmTRsid</p>
<p>(0x7479)</p></td>
<td>0x79</td>
<td>An integer value that specifies a revision save ID, as specified in
[ECMA-376] Part 1, Section 17.15.1.70 rsid (Single Session Revision Save
ID), associated with table formatting. If not present, then no revision
save ID is specified for this formatting.</td>
</tr>
<tr class="odd">
<td><p>sprmTCellVertAlignStyle</p>
<p>(0x347C)</p></td>
<td>0x7C</td>
<td>A <a href="#verticalalign">VerticalAlign</a> value that specifies
the vertical alignment of content within cells as defined by a Table
style. By default, the value is vaTop.</td>
</tr>
<tr class="even">
<td><p>sprmTCellNoWrapStyle</p>
<p>(0x347D)</p></td>
<td>0x7D</td>
<td>A Bool8 value that specifies whether content within cells MAY<span
id="Appendix_A_Target_154" class="anchor"></span><a
href="#Appendix_A_154">&lt;154&gt;</a> <a
href="#gt_869587e8-959d-4f54-b659-ce4643508463"><strong>word
wrap</strong></a>. This Sprm is used by table styles and MUST NOT appear
outside of the <strong>grpprlTapx</strong> array of UpxTapx. If this
property is "true" (1), content SHOULD NOT<span
id="Appendix_A_Target_155" class="anchor"></span><a
href="#Appendix_A_155">&lt;155&gt;</a> word wrap. By default, content
MAY<span id="Appendix_A_Target_156" class="anchor"></span><a
href="#Appendix_A_156">&lt;156&gt;</a> word wrap. This property is
ignored if the cell has an absolute width set by using sprmTCellWidth
with <strong>ftsWidth</strong> equal to ftsDxa (0x03)—cell content wraps
if it cannot fit on a single line.</td>
</tr>
<tr class="odd">
<td><p>sprmTCellBrcTopStyle</p>
<p>(0xD47F)</p></td>
<td>0x7F</td>
<td>A <a href="#brcoperand">BrcOperand</a> value that specifies the top
border for cells that are affected by a CNFOperand value. This Sprm MUST
NOT appear outside of the <strong>grpprl</strong> array of a CNFOperand
value. By default, cells have no top border.</td>
</tr>
<tr class="even">
<td><p>sprmTCellBrcBottomStyle</p>
<p>(0xD680)</p></td>
<td>0x80</td>
<td>A BrcOperand value that specifies the bottom border for cells that
are affected by a CNFOperand value. This Sprm MUST NOT appear outside of
the <strong>grpprl</strong> array of a CNFOperand. By default, cells
have no bottom border.</td>
</tr>
<tr class="odd">
<td><p>sprmTCellBrcLeftStyle</p>
<p>(0xD681)</p></td>
<td>0x81</td>
<td>A BrcOperand value that specifies the logical left border for cells
that are affected by a CNFOperand value. This Sprm MUST NOT appear
outside of the <strong>grpprl</strong> array of a CNFOperand. By
default, cells have no logical left border.</td>
</tr>
<tr class="even">
<td><p>sprmTCellBrcRightStyle</p>
<p>(0xD682)</p></td>
<td>0x82</td>
<td>A BrcOperand value that specifies the <a
href="#gt_ef86cf61-a2e3-4130-abc4-9e92dae5a2a7"><strong>logical
right</strong></a> border for cells that are affected by a CNFOperand
value. This Sprm MUST NOT appear outside of the <strong>grpprl</strong>
array of a CNFOperand. By default, cells have no logical right
border.</td>
</tr>
<tr class="odd">
<td><p>sprmTCellBrcInsideHStyle</p>
<p>(0xD683)</p></td>
<td>0x83</td>
<td>A BrcOperand value that specifies the border between a table row
that is affected by a CNFOperand value and the following table row. This
Sprm MUST NOT appear outside of the <strong>grpprl</strong> array of a
CNFOperand. By default, table rows have no borders between them.</td>
</tr>
<tr class="even">
<td><p>sprmTCellBrcInsideVStyle</p>
<p>(0xD684)</p></td>
<td>0x84</td>
<td>A BrcOperand value that specifies the border between cells of a
table row that are affected by a CNFOperand. This Sprm MUST NOT appear
outside of the <strong>grpprl</strong> array of a CNFOperand. By
default, cells have no border between them.</td>
</tr>
<tr class="odd">
<td><p>sprmTCellBrcTL2BRStyle</p>
<p>(0xD685)</p></td>
<td>0x85</td>
<td>A BrcOperand value that specifies a diagonal border from the top,
logical left corner to the bottom, logical right corner of each cell
that is affected by a CNFOperand. This Sprm MUST NOT appear outside of
the <strong>grpprl</strong> array of a CNFOperand. By default, cells
have no diagonal border.</td>
</tr>
<tr class="even">
<td><p>sprmTCellBrcTR2BLStyle</p>
<p>(0xD686)</p></td>
<td>0x86</td>
<td>A BrcOperand value that specifies a diagonal border from the top,
logical right corner to the bottom, logical left corner of each cell
that is affected by a CNFOperand. This Sprm MUST NOT appear outside of
the <strong>grpprl</strong> array of a CNFOperand. By default, cells
have no diagonal border.</td>
</tr>
<tr class="odd">
<td><p>sprmTCellShdStyle</p>
<p>(0xD687)</p></td>
<td>0x87</td>
<td>A SHDOperand value that specifies the background shading to be
applied to an entire table defined by a Table style. By default, tables
are not shaded.</td>
</tr>
<tr class="even">
<td><p>sprmTCHorzBands</p>
<p>(0x3488)</p></td>
<td>0x88</td>
<td>An unsigned 8-bit integer value that specifies the number of rows in
a <a href="#gt_29e4e1ad-bba7-40a0-81f6-f7ad1df73cf4"><strong>horizontal
band</strong></a> that is used for conditional formatting as defined by
a Table style. This value MUST be at least 1 and MUST NOT exceed 3. By
default, tables are not shaded with horizontal bands.</td>
</tr>
<tr class="odd">
<td><p>sprmTCVertBands</p>
<p>(0x3489)</p></td>
<td>0x89</td>
<td>An unsigned 8-bit integer value that specifies the number of columns
in a <a href="#gt_a7a55b00-92d1-40a8-b207-6b7c02bb183c"><strong>vertical
band</strong></a> that is used for conditional formatting as defined by
a Table style. This value MUST be at least 1 and MUST NOT exceed 3. By
default, tables are not shaded with vertical bands.</td>
</tr>
<tr class="even">
<td><p>sprmTJc</p>
<p>(0x548A)</p></td>
<td>0x8A</td>
<td><p>An unsigned 16-bit integer value that specifies the logical
justification of the table. The following shows the valid values and
their meanings.</p>
<blockquote>
<p>0 - The table is logical left-justified</p>
<p>1 - The table is centered</p>
<p>2 - The table is logical right-justified</p>
</blockquote>
<p>By default, tables are logical left justified.</p></td>
</tr>
</tbody>
</table>

### Section Properties

A [Prl](#prl) structure with a **sprm.sgc** of 4 modifies a
[**section**](#gt_49a2b98a-d101-4889-9108-87f567e758cf) property.

The following table specifies the section property modifiers, including
the valid **sprm** values, their function, and the corresponding
**operand** type and meaning.

<table>
<colgroup>
<col style="width: 20%" />
<col style="width: 8%" />
<col style="width: 71%" />
</colgroup>
<thead>
<tr class="header">
<th>sprm</th>
<th>ispmd</th>
<th>Operand</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>sprmScnsPgn</p>
<p>(0x3000)</p></td>
<td>0x00</td>
<td><p>A <a href="#cns">CNS</a> indicating the number separator used
between the chapter number and the page number for purpose of <a
href="#gt_1831737e-39f6-45f6-a116-89767cc45f98"><strong>chapter
numbering</strong></a> in page number fields (that is, when
sprmSiHeadingPgn specifies a value other than 0).</p>
<p>By default, the chapter number separator is a hyphen (see
cnsHyphen).</p></td>
</tr>
<tr class="even">
<td><p>sprmSiHeadingPgn</p>
<p>(0x3001)</p></td>
<td>0x01</td>
<td><p>An unsigned 8-bit integer value that specifies which heading
level starts new chapters for the purposes of chapter numbering in page
number fields. The value MUST be in the interval [0, 9]. A value of 0
specifies that chapter numbers are not shown in page number fields,
whereas values from 1 to 9 specify corresponding heading levels (1
specifies Heading 1, 2 specifies Heading 2, and so forth).</p>
<p>By default, chapter numbers are not shown in page number fields.</p>
<p>In the event that the style corresponding to the indicated heading
level does not have associated numbering, chapter numbers are not shown
in page number fields.</p></td>
</tr>
<tr class="odd">
<td><p>sprmSDxaColWidth</p>
<p>(0xF203)</p></td>
<td>0x03</td>
<td>An <a href="#sdxacolwidthoperand">SDxaColWidthOperand</a> that
specifies the width of a particular column, in case columns are not
evenly spaced as specified by sprmSFEvenlySpaced.</td>
</tr>
<tr class="even">
<td><p>sprmSDxaColSpacing</p>
<p>(0xF204)</p></td>
<td>0x04</td>
<td><p>An <a href="#sdxacolspacingoperand">SDxaColSpacingOperand</a>
that specifies the spacing between two columns in case columns are not
evenly spaced (as instructed by sprmSFEvenlySpaced).</p>
<p>The <strong>iCol</strong> field of the SDxaColSpacingOperand
structure specifies the index of the first of the two columns.</p>
<p>By default there is no spacing between columns.</p></td>
</tr>
<tr class="odd">
<td><p>sprmSFEvenlySpaced</p>
<p>(0x3005)</p></td>
<td>0x05</td>
<td><p>A <a href="#bool8">Bool8</a> value that specifies whether the
space between page margins is distributed evenly between all columns
(after subtracting the space between columns, as instructed by
sprmSDxaColumns). A value of 1 specifies that space is distributed
evenly; a value of 0 specifies that column widths and inter-column
spacing MUST be specified by sprmSDxaColWidth and
sprmSDxaColSpacing.</p>
<p>By default, columns are evenly spaced.</p></td>
</tr>
<tr class="even">
<td><p>sprmSFProtected</p>
<p>(0x3006)</p></td>
<td>0x06</td>
<td><p>A Bool8 value that specifies whether the section is unprotected
in case document editing is restricted to <a
href="#gt_8fa0b648-6259-4969-8561-a87b325fb240"><strong>form
fields</strong></a> only (see <a
href="#dopbase">DopBase</a>.<strong>fProtEnabled</strong>). A value of 1
indicates that the section is unprotected, whereas a value of 0
indicates that the section is protected.</p>
<p>By default, the protection status of a section is specified by
DopBase.<strong>fProtEnabled</strong>.</p></td>
</tr>
<tr class="odd">
<td><p>sprmSDmBinFirst</p>
<p>(0x5007)</p></td>
<td>0x07</td>
<td><p>A <a href="#sdmbinoperand">SDmBinOperand</a> that specifies the
paper source used by the printer for the first page of the section.</p>
<p>By default, no paper source is specified.</p></td>
</tr>
<tr class="even">
<td><p>sprmSDmBinOther</p>
<p>(0x5008)</p></td>
<td>0x08</td>
<td><p>An SDmBinOperand that specifies the paper source used by the
printer for all pages in the section except the first.</p>
<p>By default, no paper source is specified.</p></td>
</tr>
<tr class="odd">
<td><p>sprmSBkc</p>
<p>(0x3009)</p></td>
<td>0x09</td>
<td><p>An <a href="#sbkcoperand">SBkcOperand</a> that specifies what
kind of <a
href="#gt_b913633e-3b9f-4e4a-8730-f2e4bdb2be68"><strong>section
break</strong></a> terminates the section.</p>
<p>By default, section breaks are of type "Next Page" (see
bkcNewPage).</p></td>
</tr>
<tr class="even">
<td><p>sprmSFTitlePage</p>
<p>(0x300A)</p></td>
<td>0x0A</td>
<td><p>A Bool8 value that specifies whether the section has a different
first page (a "title page"). A value of 1 indicates that the first page
is separate, having its own header and footer. A value of 0 indicates
that there is no title page.</p>
<p>By default, a section does not have a separate first page.</p></td>
</tr>
<tr class="odd">
<td><p>sprmSCcolumns</p>
<p>(0x500B)</p></td>
<td>0x0B</td>
<td><p>An unsigned 16-bit integer whose value is one less than the
number of columns in this section. MUST be less than or equal to 43. A
value of zero specifies a section with a single column.</p>
<p>By default, a section has a single column.</p>
<p>If the value is larger than zero, and the columns are not evenly
spaced (as instructed by sprmSFEvenlySpaced), then there MUST be the
same number of sprmSDxaColWidth as the columns, each specifying the
width of a different column.</p>
<p>An end-of-column character (0xE) at a particular <a
href="#Section_a3d44e167d2946f7bb7bd0d8a5734f83">CP</a> specifies a
manual column break at that CP.</p></td>
</tr>
<tr class="even">
<td><p>sprmSDxaColumns</p>
<p>(0x900C)</p></td>
<td>0x0C</td>
<td><p>An <a href="#xas_nonneg">XAS_nonNeg</a> that specifies the space
between columns, in case columns are evenly spaced (as instructed by
sprmSFEvenlySpaced).</p>
<p>By default, spacing between columns varies depending on
implementation and system settings, so implementations SHOULD<span
id="Appendix_A_Target_157" class="anchor"></span>&lt;157&gt; write this
<a href="#sprm"><strong>Sprm</strong></a> out to ensure interoperability
even if the value does not differ from the default.</p>
<p>The default values are dependent on the installation language of the
application. The installation LCID values and their corresponding
defaults are shown following.</p>
<p>LCID 1025: 720 twips</p>
<p>LCID 1026: 708 twips</p>
<p>LCID 1027: 708 twips</p>
<p>LCID 1028: 720 twips</p>
<p>LCID 1029: 708 twips</p>
<p>LCID 1030: 708 twips</p>
<p>LCID 1031: 720 twips</p>
<p>LCID 1032: 720 twips</p>
<p>LCID 1033: 720 twips</p>
<p>LCID 1034: 720 twips</p>
<p>LCID 1035: 708 twips</p>
<p>LCID 1036: 720 twips</p>
<p>LCID 1037: 720 twips</p>
<p>LCID 1038: 708 twips</p>
<p>LCID 1039: 708 twips</p>
<p>LCID 1040: 720 twips</p>
<p>LCID 1041: 720 twips</p>
<p>LCID 1042: 720 twips</p>
<p>LCID 1043: 708 twips</p>
<p>LCID 1044: 708 twips</p>
<p>LCID 1045: 708 twips</p>
<p>LCID 1046: 720 twips</p>
<p>LCID 1048: 708 twips</p>
<p>LCID 1049: 720 twips</p>
<p>LCID 1050: 720 twips</p>
<p>LCID 1051: 708 twips</p>
<p>LCID 1053: 720 twips</p>
<p>LCID 1055: 708 twips</p>
<p>LCID 1058: 720 twips</p>
<p>LCID 1059: 720 twips</p>
<p>LCID 1060: 708 twips</p>
<p>LCID 1061: 708 twips</p>
<p>LCID 1062: 720 twips</p>
<p>LCID 1063: 1296 twips</p>
<p>LCID 1067: 720 twips</p>
<p>LCID 1068: 720 twips</p>
<p>LCID 1069: 708 twips</p>
<p>LCID 1078: 708 twips</p>
<p>LCID 1079: 720 twips</p>
<p>LCID 1086: 720 twips</p>
<p>LCID 1087: 720 twips</p>
<p>LCID 1088: 708 twips</p>
<p>LCID 1089: 708 twips</p>
<p>LCID 1092: 720 twips</p>
<p>LCID 1104: 720 twips</p>
<p>LCID 2052: 720 twips</p>
<p>LCID 2070: 720 twips</p>
<p>LCID 2074: 708 twips</p></td>
</tr>
<tr class="odd">
<td><p>sprmSNfcPgn</p>
<p>(0x300E)</p></td>
<td>0x0E</td>
<td><p>An 8-bit MSONFC (as specified in <a
href="%5bMS-OSHARED%5d.pdf#Section_d93502fa5b8f4f47a3fe5574046f4b8d">[MS-OSHARED]</a>
section 2.2.1.3) that specifies the numbering format used for page
numbers.</p>
<p>An application MAY<span id="Appendix_A_Target_158"
class="anchor"></span><a href="#Appendix_A_158">&lt;158&gt;</a> fall
back to a different MSONFC if the format specified by the value is not a
counting number format—for example, if it is
<strong>msonfcBullet</strong>.</p>
<p>By default, page numbers use the <strong>msonfcArabic</strong>
numbering format.</p></td>
</tr>
<tr class="even">
<td><p>sprmSFPgnRestart</p>
<p>(0x3011)</p></td>
<td>0x11</td>
<td><p>A Bool8 value that specifies whether the section starts with a
new page number. A value of 1 indicates that the section starts with a
new page number as specified by sprmSPgnStart97 or sprmSPgnStart. A
value of 0 indicates that page numbers continue from the previous
section (or begin at 1, if this is the first section).</p>
<p>By default, page numbers continue from the previous section (or begin
at 1, if this is the first section).</p></td>
</tr>
<tr class="odd">
<td><p>sprmSFEndnote</p>
<p>(0x3012)</p></td>
<td>0x12</td>
<td><p>A Bool8 value that specifies whether <a
href="#gt_d14d8e59-0dcc-499b-b57f-0c48f0420137"><strong>endnotes</strong></a>
are shown at the end of the section. This SPRM is only considered when
endnotes are set to show at the ends of sections (see
DOPBASE.<strong>epc</strong>).</p>
<p>A value of 1 specifies that endnotes are shown at the end of the
section.</p>
<p>A value of 0 specifies that endnotes are suppressed for the current
section, and they are shown at the end of the next section for which
endnotes are not suppressed. If such a section does not exist, the
endnotes are shown at the end of the last section of the document.</p>
<p>By default, endnotes are not suppressed, and they show at the end of
a section.</p></td>
</tr>
<tr class="even">
<td><p>sprmSLnc</p>
<p>(0x3013)</p></td>
<td>0x13</td>
<td><p>An <a href="#slncoperand">SLncOperand</a> that specifies the line
numbering mode to use in case line numbers are enabled (see
sprmSNLnnMod).</p>
<p>By default, line numbers restart every page.</p></td>
</tr>
<tr class="odd">
<td><p>sprmSNLnnMod</p>
<p>(0x5015)</p></td>
<td>0x15</td>
<td><p>An unsigned 16-bit integer that specifies the distance in the
number of lines between line number labels. For example, a value of 1
indicates that every line displays a line number, whereas a value of 3
indicates that only every third line shows a line number.</p>
<p>The value MUST be in the interval [0, 100]. A value of 0 specifies
that line numbers are disabled.</p>
<p>By default, line numbers are disabled.</p></td>
</tr>
<tr class="even">
<td><p>sprmSDxaLnn</p>
<p>(0x9016)</p></td>
<td>0x16</td>
<td><p>An XAS_nonNeg that specifies the distance between line numbers
and the lines of text to which they apply. A value of 0 indicates that
the application MUST automatically determine positioning.</p>
<p>By default, the positioning of line numbers is automatically
determined.</p></td>
</tr>
<tr class="odd">
<td><p>sprmSDyaHdrTop</p>
<p>(0xB017)</p></td>
<td>0x17</td>
<td><p>A <a href="#yas_nonneg">YAS_nonNeg</a> that specifies the header
distance, in <a
href="#gt_4b82472c-103d-4eff-a07e-6a0f784e3382"><strong>twips</strong></a>,
from the top edge of the page.</p>
<p>Because the default distance is dependent on the implementation and
system settings, implementations SHOULD<a
href="#Appendix_A_159">&lt;159&gt;</a> write this Sprm out even if the
value does not differ from the default.</p>
<p>The default values are dependent on the install language of the
application. The installation LCID values and their corresponding
defaults are shown following.</p>
<p>LCID 1025: 720 twips</p>
<p>LCID 1026: 708 twips</p>
<p>LCID 1027: 708 twips</p>
<p>LCID 1028: 720 twips</p>
<p>LCID 1029: 708 twips</p>
<p>LCID 1030: 708 twips</p>
<p>LCID 1031: 720 twips</p>
<p>LCID 1032: 720 twips</p>
<p>LCID 1033: 720 twips</p>
<p>LCID 1034: 720 twips</p>
<p>LCID 1035: 708 twips</p>
<p>LCID 1036: 720 twips</p>
<p>LCID 1037: 720 twips</p>
<p>LCID 1038: 708 twips</p>
<p>LCID 1039: 708 twips</p>
<p>LCID 1040: 720 twips</p>
<p>LCID 1041: 720 twips</p>
<p>LCID 1042: 720 twips</p>
<p>LCID 1043: 708 twips</p>
<p>LCID 1044: 708 twips</p>
<p>LCID 1045: 708 twips</p>
<p>LCID 1046: 720 twips</p>
<p>LCID 1048: 708 twips</p>
<p>LCID 1049: 720 twips</p>
<p>LCID 1050: 720 twips</p>
<p>LCID 1051: 708 twips</p>
<p>LCID 1053: 720 twips</p>
<p>LCID 1055: 708 twips</p>
<p>LCID 1058: 708 twips</p>
<p>LCID 1059: 708 twips</p>
<p>LCID 1060: 708 twips</p>
<p>LCID 1061: 708 twips</p>
<p>LCID 1062: 720 twips</p>
<p>LCID 1063: 567 twips</p>
<p>LCID 1067: 708 twips</p>
<p>LCID 1068: 708 twips</p>
<p>LCID 1069: 708 twips</p>
<p>LCID 1078: 708 twips</p>
<p>LCID 1079: 708 twips</p>
<p>LCID 1086: 720 twips</p>
<p>LCID 1087: 708 twips</p>
<p>LCID 1088: 708 twips</p>
<p>LCID 1089: 708 twips</p>
<p>LCID 1092: 708 twips</p>
<p>LCID 1104: 720 twips</p>
<p>LCID 2052: 720 twips</p>
<p>LCID 2070: 720 twips</p>
<p>LCID 2074: 708 twips</p></td>
</tr>
<tr class="even">
<td><p>sprmSDyaHdrBottom</p>
<p>(0xB018)</p></td>
<td>0x18</td>
<td><p>An YAS_nonNeg that specifies the footer distance, in twips, from
the bottom edge of the page.</p>
<p>Implementations SHOULD<span id="Appendix_A_Target_160"
class="anchor"></span><a href="#Appendix_A_160">&lt;160&gt;</a> write
this Sprm out to ensure interoperability because the footer distance
from the bottom is dependent on the implementation and system
settings.</p>
<p>The default values are the same as listed for
sprmSDyaHdrTop.</p></td>
</tr>
<tr class="odd">
<td><p>sprmSLBetween</p>
<p>(0x3019)</p></td>
<td>0x19</td>
<td><p>A Bool8 value that specifies whether lines are drawn between
columns of text.</p>
<p>By default, lines are not drawn between columns of text.</p></td>
</tr>
<tr class="even">
<td><p>sprmSVjc</p>
<p>(0x301A)</p></td>
<td>0x1A</td>
<td><p>A <a href="#vjc">Vjc</a> value that specifies the vertical
justification of the section.</p>
<p>By default, sections are top-aligned (vjcTop).</p></td>
</tr>
<tr class="odd">
<td><p>sprmSLnnMin</p>
<p>(0x501B)</p></td>
<td>0x1B</td>
<td><p>An unsigned 16-bit integer whose value is one less than the
starting value for line numbers. The value SHOULD<span
id="Appendix_A_Target_161" class="anchor"></span><a
href="#Appendix_A_161">&lt;161&gt;</a> be less than or equal to
32766.</p>
<p>By default, line numbers begin at 1.</p></td>
</tr>
<tr class="even">
<td><p>sprmSPgnStart97</p>
<p>(0x501C)</p></td>
<td>0x1C</td>
<td><p>An unsigned 16-bit integer that specifies the starting value for
page numbers when the section has page number restart enabled (as
specified by sprmSFPgnRestart). This value MUST be ignored if the
section does not have page number restart enabled.</p>
<p>The value of the operand SHOULD<span id="Appendix_A_Target_162"
class="anchor"></span><a href="#Appendix_A_162">&lt;162&gt;</a> be less
than or equal to 32766.</p>
<p>By default, page numbers restart at 0.</p></td>
</tr>
<tr class="odd">
<td><p>sprmSBOrientation</p>
<p>(0x301D)</p></td>
<td>0x1D</td>
<td><p>An <a href="#sborientationoperand">SBOrientationOperand</a> that
specifies the page orientation of the section.</p>
<p>By default, the page orientation is portrait.</p></td>
</tr>
<tr class="even">
<td><p>sprmSXaPage</p>
<p>(0xB01F)</p></td>
<td>0x1F</td>
<td><p>An unsigned 16-bit integer that specifies the page width of the
section in twips. The value of the operand MUST be in the interval [144,
31680].</p>
<p>By default, the page width is 215.9 mm (8.5 inches, or 12240
twips).</p></td>
</tr>
<tr class="odd">
<td><p>sprmSYaPage</p>
<p>(0xB020)</p></td>
<td>0x20</td>
<td><p>An unsigned 16-bit integer that specifies the page height of the
section, in twips. The value of the operand MUST be in the interval
[144, 31680].</p>
<p>By default, the page height is 279.4 mm (11 inches, or 15840
twips).</p></td>
</tr>
<tr class="even">
<td><p>sprmSDxaLeft</p>
<p>(0xB021)</p></td>
<td>0x21</td>
<td><p>An XAS_nonNeg that specifies the width, in twips, of the left
margin.</p>
<p>By default, the width of the left margin varies depending on the
implementation and the system settings, so implementations MUST use this
SPRM to specify the left margin of each section.</p></td>
</tr>
<tr class="odd">
<td><p>sprmSDxaRight</p>
<p>(0xB022)</p></td>
<td>0x22</td>
<td><p>An XAS_nonNeg that specifies the width, in twips, of the right
margin.</p>
<p>By default, the width of the right margin varies depending on the
implementation and the system settings, so implementations MUST use this
SPRM to specify the right margin of each section.</p></td>
</tr>
<tr class="even">
<td><p>sprmSDyaTop</p>
<p>(0x9023)</p></td>
<td>0x23</td>
<td><p>A <a href="#yas">YAS</a> that specifies the height of the top
margin, in twips. A positive value indicates a minimum top margin; this
margin MUST be grown to avoid overlapping the space that is occupied by
<a
href="#gt_84a82291-9444-481e-97e3-4ff69a88e932"><strong>headers</strong></a>.
A negative value indicates a fixed margin; the top margin MUST be the
absolute value of the value that is specified by this SPRM regardless of
the space that is occupied by headers.</p>
<p>Each section MUST specify a top margin. The top margin MUST be less
than or equal to 31665 and greater than or equal to -31665.</p></td>
</tr>
<tr class="odd">
<td><p>sprmSDyaBottom</p>
<p>(0x9024)</p></td>
<td>0x24</td>
<td><p>A YAS that specifies the height of the bottom margin, in twips. A
positive value specifies a minimum bottom margin; this margin MUST be
grown to avoid overlapping the space that is occupied by <a
href="#gt_c5883e8c-12bd-4d69-b0d0-6588eec448cc"><strong>footers</strong></a>
or <a
href="#gt_17b5b16e-d079-48c9-a5d1-db80406c45a8"><strong>footnotes</strong></a>.
A negative value specifies a fixed margin; the bottom margin MUST be the
absolute value of the value that is specified by this SPRM regardless of
the space that is occupied by footers or footnotes.</p>
<p>Each section MUST specify a bottom margin. The bottom margin MUST be
less than or equal to 31665 and greater than or equal to
-31665.</p></td>
</tr>
<tr class="even">
<td><p>sprmSDzaGutter</p>
<p>(0xB025)</p></td>
<td>0x25</td>
<td><p>An unsigned 16-bit integer that specifies the size of the <a
href="#gt_d38255f8-dca6-4e1c-be9d-71691a6ab4e5"><strong>gutter</strong></a>
margin, in twips.</p>
<p>By default, there is no <a
href="#gt_384fedff-6be0-4cc3-9361-0430ba5ec2dd"><strong>gutter
margin</strong></a>.</p></td>
</tr>
<tr class="odd">
<td><p>sprmSDmPaperReq</p>
<p>(0x5026)</p></td>
<td>0x26</td>
<td><p>A 16-bit unsigned integer that specifies a tie-breaker value to
be used when more than one available paper format ("Letter Matte",
"Letter Gloss", "Letter w/ Letterhead", "Letter Pink", and so on)
matches the page dimensions as specified by sprmSXaPage and sprmSYaPage.
This tie-breaker value MAY<span id="Appendix_A_Target_163"
class="anchor"></span><a href="#Appendix_A_163">&lt;163&gt;</a> be
ignored.</p>
<p>The determination and interpretation of this value is
implementation-specific.</p>
<p>The determination of the paper sizes for an application is
implementation-specific</p></td>
</tr>
<tr class="even">
<td><p>sprmSFBiDi</p>
<p>(0x3228)</p></td>
<td>0x28</td>
<td><p>A Bool8 value that specifies whether the section uses <a
href="#gt_91359688-7863-4e88-b507-f57b3dada5ec"><strong>right-to-left</strong></a>
layout; that is, line numbers are displayed on the right side of text
and columns are populated from right to left.</p>
<p>By default, sections do not use right-to-left layout.</p></td>
</tr>
<tr class="odd">
<td><p>sprmSFRTLGutter</p>
<p>(0x322A)</p></td>
<td>0x2A</td>
<td><p>A Bool8 value that specifies whether the gutter margin requires
right-to-left layout. A value of 1 indicates a right-to-left gutter
margin.</p>
<p>By default, gutter margins are not right-to-left.</p></td>
</tr>
<tr class="even">
<td><p>sprmSBrcTop80</p>
<p>(0x702B)</p></td>
<td>0x2B</td>
<td><p>A <a href="#brc80">Brc80</a> that specifies the top page
border.</p>
<p>By default, pages have no top border.</p></td>
</tr>
<tr class="odd">
<td><p>sprmSBrcLeft80</p>
<p>(0x702C)</p></td>
<td>0x2C</td>
<td><p>A Brc80 that specifies the left page border.</p>
<p>By default, pages have no left border.</p></td>
</tr>
<tr class="even">
<td><p>sprmSBrcBottom80</p>
<p>(0x702D)</p></td>
<td>0x2D</td>
<td><p>A Brc80 that specifies the bottom page border.</p>
<p>By default, pages have no bottom border.</p></td>
</tr>
<tr class="odd">
<td><p>sprmSBrcRight80</p>
<p>(0x702E)</p></td>
<td>0x2E</td>
<td><p>A Brc80 that specifies the right page border.</p>
<p>By default, pages have no right border.</p></td>
</tr>
<tr class="even">
<td><p>sprmSPgbProp</p>
<p>(0x522F)</p></td>
<td>0x2F</td>
<td><p>An <a href="#spgbpropoperand">SPgbPropOperand</a> that specifies
page border properties.</p>
<p>By default, page borders apply to all pages of the section
(pgbAllPages), they are displayed in front of text and other content
(pgbAtFront), and their distance is measured from text
(pgbFromText).</p></td>
</tr>
<tr class="odd">
<td><p>sprmSDxtCharSpace</p>
<p>(0x7030)</p></td>
<td>0x30</td>
<td><p>A signed 32-bit integer that specifies the difference between the
desired <a
href="#gt_44c69cba-79c8-4147-8b3a-ead7b39a63d5"><strong>character
pitch</strong></a> for the <a
href="#gt_f1f5f018-eebc-4631-9036-ed857713c71c"><strong>document
grid</strong></a>, if enabled (see sprmSClm), and the pitch of the font
that is specified by the Normal style. The resolution of the operand is
4096/pt. That is, a 1-pt difference between the desired character pitch
and the font size as specified by the Normal style would affect the
operand by 4096. For example, if the Normal style specified a font size
of 11 pt, an operand value of 6144 would specify a desired character
pitch for document grid of 12.5 pt (because 6144 / 4096 = 1.5 pt, so 11
pt + 1.5 pt = 12.5 pt).</p>
<p>By default, there is no difference between the desired character
pitch for the document grid and the pitch of the font that is specified
by the Normal style.</p>
<p>This value MUST be greater than or equal to -670925 and MUST be less
than or equal to 6488064.</p></td>
</tr>
<tr class="even">
<td><p>sprmSDyaLinePitch</p>
<p>(0x9031)</p></td>
<td>0x31</td>
<td><p>A YAS that specifies, in twips, the line height that is used for
document grid, if enabled (see sprmSClm). This line height does not
apply to lines within table cells in case the
fDontAdjustLineHeightInTable flag is set in the document <a
href="#dop2000">Dop2000</a>.</p>
<p>If the document grid is enabled (see sprmSClm), a section MUST
specify the line height that is used for the document grid.</p>
<p>This value MUST be greater than or equal to 1, and MUST be less than
or equal to 31680.</p></td>
</tr>
<tr class="odd">
<td><p>sprmSClm</p>
<p>(0x5032)</p></td>
<td>0x32</td>
<td><p>An <a href="#sclmoperand">SClmOperand</a> that specifies the
document grid mode that is in use for the section.</p>
<p>By default, document grid is disabled (clmUseDefault).</p></td>
</tr>
<tr class="even">
<td><p>sprmSTextFlow</p>
<p>(0x5033)</p></td>
<td>0x33</td>
<td>A MSOTXFL that specifies the text flow of the section, as specified
in <a
href="%5bMS-ODRAW%5d.pdf#Section_8560795e77594745838ff7f2ef2f1872">[MS-ODRAW]</a>
section 2.4.5.</td>
</tr>
<tr class="odd">
<td><p>sprmSBrcTop</p>
<p>(0xD234)</p></td>
<td>0x34</td>
<td><p>A <a href="#brcoperand">BrcOperand</a> that specifies the top
page border.</p>
<p>By default, pages have no top border.</p></td>
</tr>
<tr class="even">
<td><p>sprmSBrcLeft</p>
<p>(0xD235)</p></td>
<td>0x35</td>
<td><p>A BrcOperand that specifies the left page border.</p>
<p>By default, pages have no left border.</p></td>
</tr>
<tr class="odd">
<td><p>sprmSBrcBottom</p>
<p>(0xD236)</p></td>
<td>0x36</td>
<td><p>A BrcOperand that specifies the bottom page border.</p>
<p>By default, pages have no bottom border.</p></td>
</tr>
<tr class="even">
<td><p>sprmSBrcRight</p>
<p>(0xD237)</p></td>
<td>0x37</td>
<td><p>A BrcOperand that specifies the right page border.</p>
<p>By default, pages have no right border.</p></td>
</tr>
<tr class="odd">
<td><p>sprmSWall</p>
<p>(0x3239)</p></td>
<td>0x39</td>
<td><p>A Bool8 value that specifies whether the values of section
properties are preserved for revision marking purposes until the
modifications are accepted or rejected by the user.</p>
<p>A value of 1 specifies that the values of properties are preserved.
All SPRMs that are encountered before the sprmSWall in the property
evaluation of the section specify the state of properties before
revision marking was enabled, whereas all SPRMs following the sprmSWall
specify the property modifications that occurred afterwards.</p>
<p>A value of 0 specifies that no values are preserved (overriding any
previously encountered sprmSWall SPRMs that specify the contrary).
Neither SPRMs encountered before the sprmSWall, nor subsequent SPRMs
(until another sprmSWall, if any), are treated in any special way with
regard to revision marking.</p>
<p>By default, the values of properties are not preserved.</p></td>
</tr>
<tr class="even">
<td><p>sprmSRsid</p>
<p>(0x703A)</p></td>
<td>0x3A</td>
<td>An integer that specifies a revision save ID, as specified in <a
href="https://go.microsoft.com/fwlink/?LinkId=200054">[ECMA-376]</a>
Part 1, Section 17.15.1.70 rsid (Single Session Revision Save ID),
associated with section formatting. If this value is not present, no
revision save ID is specified for this formatting.</td>
</tr>
<tr class="odd">
<td><p>sprmSFpc</p>
<p>(0x303B)</p></td>
<td>0x3B</td>
<td><p>An <a href="#sfpcoperand">SFpcOperand</a> that specifies the
footnote positioning for the section.</p>
<p>By default, footnotes are positioned at the bottom of the page (see
fpcBottomPage).</p></td>
</tr>
<tr class="even">
<td><p>sprmSRncFtn</p>
<p>(0x303C)</p></td>
<td>0x3C</td>
<td><p>An <a href="#rnc">Rnc</a> that specifies whether and when
footnote numbering is restarted. All possible values of the Rnc
enumeration are allowed.</p>
<p>By default, footnotes are numbered continuously (see
rncCont).</p></td>
</tr>
<tr class="odd">
<td><p>sprmSRncEdn</p>
<p>(0x303E)</p></td>
<td>0x3E</td>
<td><p>An Rnc value that specifies whether and when endnote numbering is
restarted. The value MUST be either rncCont or rncRstSect, as rncRstPage
does not apply to endnotes.</p>
<p>By default, endnotes are numbered continuously (see
rncCont).</p></td>
</tr>
<tr class="even">
<td><p>sprmSNFtn</p>
<p>(0x503F)</p></td>
<td>0x3F</td>
<td><p>An unsigned 16-bit integer that specifies an offset to add to
footnote numbers in this section.</p>
<p>If this section has continuous footnote numbering (as specified by
sprmSRncFtn), then the value of the sprm minus one MUST be added to
every footnote number. (For example, with an offset of 6, a footnote
that would have been numbered 2 is now numbered 2+5=7.) The sprm value
MUST be less than or equal to 16383. If this section does not have
continuous footnote numbering, the value of this sprm MUST be
ignored.</p>
<p>By default, no offset is added to footnote numbers.</p></td>
</tr>
<tr class="odd">
<td><p>sprmSNfcFtnRef</p>
<p>(0x5040)</p></td>
<td>0x40</td>
<td><p>A 16-bit MSONFC (as specified in [MS-OSHARED] section 2.2.1.3)
that specifies the numbering format used for footnotes.</p>
<p>By default, footnotes use the <strong>msonfcArabic</strong> numbering
format.</p></td>
</tr>
<tr class="even">
<td><p>sprmSNEdn</p>
<p>(0x5041)</p></td>
<td>0x41</td>
<td><p>An unsigned 16-bit integer that specifies an offset to add to
endnote numbers in this section.</p>
<p>If this section has continuous endnote numbering (as specified by
sprmSRncEdn), then every endnote number in this section is offset by the
value of this operand minus one. (For example, with an offset of 6, a
endnote that would have been numbered 2 is now numbered 2+5=7.) The
operand value MUST be less than or equal to 16383. If this section does
not have continuous endnote numbering, this operand MUST be ignored.</p>
<p>By default, no offset is added to endnote numbers.</p></td>
</tr>
<tr class="odd">
<td><p>sprmSNfcEdnRef</p>
<p>(0x5042)</p></td>
<td>0x42</td>
<td><p>A 16-bit MSONFC (as specified in [MS-OSHARED] section 2.2.1.3)
that specifies the numbering format used for endnotes.</p>
<p>By default, endnotes use the <strong>msonfcLCRoman</strong> numbering
format.</p></td>
</tr>
<tr class="even">
<td><p>sprmSPropRMark</p>
<p>(0xD243)</p></td>
<td>0x43</td>
<td><p>A <a href="#proprmarkoperand">PropRMarkOperand</a> that specifies
whether the section has an associated <a
href="#gt_4d5c1e95-df26-408b-a964-4a6cba5d2239"><strong>property
revision mark</strong></a>, as well as its author and date/time.</p>
<p>By default, sections have no property revision marks.</p></td>
</tr>
<tr class="odd">
<td><p>sprmSPgnStart</p>
<p>(0x7044)</p></td>
<td>0x44</td>
<td><p>An unsigned 32-bit integer that specifies the starting value for
page numbers when the section has page number restart enabled (as
specified by sprmSFPgnRestart). MUST be ignored if the section does not
have page number restart enabled.</p>
<p>The value of the operand MUST be less than or equal to
2147483646.</p>
<p>By default, page numbers restart at 0.</p></td>
</tr>
</tbody>
</table>

### Picture Properties

A [Prl](#prl) with a **sprm.sgc** of 3 modifies a picture property.

The following table specifies the picture property modifiers, including
the valid **sprm** values, their function, and the corresponding
**operand** type and meaning.

<table>
<colgroup>
<col style="width: 20%" />
<col style="width: 8%" />
<col style="width: 71%" />
</colgroup>
<thead>
<tr class="header">
<th>Sprm</th>
<th>ispmd</th>
<th>Operand</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>sprmPicBrcTop80</p>
<p>(0x6C02)</p></td>
<td>0x02</td>
<td>A <a href="#brc80">Brc80</a> that specifies the top border of the
inline picture. The Brc80.<strong>brcType</strong> field MUST be less
than or equal to 0x19. By default, inline pictures do not have
borders.</td>
</tr>
<tr class="even">
<td><p>sprmPicBrcLeft80</p>
<p>(0x6C03)</p></td>
<td>0x03</td>
<td>A Brc80 that specifies the left border of the inline picture. The
Brc80.<strong>brcType</strong> field MUST be less than or equal to 0x19.
By default, inline pictures do not have borders.</td>
</tr>
<tr class="odd">
<td><p>sprmPicBrcBottom80</p>
<p>(0x6C04)</p></td>
<td>0x04</td>
<td>A Brc80 that specifies the bottom border of the inline picture. The
Brc80.<strong>brcType</strong> field MUST be less than or equal to 0x19.
By default, inline pictures do not have borders.</td>
</tr>
<tr class="even">
<td><p>sprmPicBrcRight80</p>
<p>(0x6C05)</p></td>
<td>0x05</td>
<td>A Brc80 that specifies the right border of the inline picture. The
Brc80.<strong>brcType</strong> field MUST be less than or equal to 0x19.
By default, inline pictures do not have borders.</td>
</tr>
<tr class="odd">
<td><p>sprmPicBrcTop</p>
<p>(0xCE08)</p></td>
<td>0x08</td>
<td>A <a href="#brcoperand">BrcOperand</a> that specifies the top border
of the inline picture. The BrcOperand.<a
href="#brc">Brc</a>.<strong>brcType</strong> field MUST be less than or
equal to 0x1B. By default, inline pictures do not have borders.</td>
</tr>
<tr class="even">
<td><p>sprmPicBrcLeft</p>
<p>(0xCE09)</p></td>
<td>0x09</td>
<td>A BrcOperand that specifies the left border of the inline picture.
The BrcOperand.Brc.<strong>brcType</strong> field MUST be less than or
equal to 0x1B. By default, inline pictures do not have borders.</td>
</tr>
<tr class="odd">
<td><p>sprmPicBrcBottom</p>
<p>(0xCE0A)</p></td>
<td>0x0A</td>
<td>A BrcOperand that specifies the bottom border of the inline picture.
The BrcOperand.Brc.<strong>brcType</strong> field MUST be less than or
equal to 0x1B. By default, inline pictures do not have borders.</td>
</tr>
<tr class="even">
<td><p>sprmPicBrcRight</p>
<p>(0xCE0B)</p></td>
<td>0x0B</td>
<td>A BrcOperand that specifies the right border of the inline picture.
The BrcOperand.Brc.<strong>brcType</strong> field MUST be less than or
equal to 0x1B. By default, inline pictures do not have borders.</td>
</tr>
</tbody>
</table>
