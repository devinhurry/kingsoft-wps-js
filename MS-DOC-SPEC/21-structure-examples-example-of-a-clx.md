# Structure Examples

## Example of a Clx

The following is an example of a [**Clx**](#clx). This structure
demonstrates the mapping between
[CP](#Section_a3d44e167d2946f7bb7bd0d8a5734f83) elements and the
location of text in the file. See section
[2.4.1](#Section_01d5d8c4cf9c4ef980fd439e763cfe01), Retrieving Text.

| **Offset** | **Size** | **Structure**                                 | **Value**  |
|------------|----------|-----------------------------------------------|------------|
| 0000009A   | 02E8     | [FibRgFcLcb97](#fibrgfclcb97) **- rgFcLcb97** |            |
| 0000009A   | 0108     | ... (omitted for brevity) **-**               |            |
| 000001A2   | 0004     | **- fcClx**                                   | 0x000001F8 |
| 000001A6   | 0004     | **- lcbClx**                                  | 0x0000002D |
| 000001AA   | 01D8     | ... (omitted for brevity) **-**               |            |

Figure 3: Portions of the FibRgFcLcb97 structure, with emphasis on fcClx
and lcbClx

As with all Word Binary files, this file has a [**Fib**](#fib) at an
offset of zero in the [WordDocument
Stream](#Section_d7fae142670d4cd5869a708366984a71). The preceding figure
shows a portion of the **FibRgFcLcb97** that is contained in that Fib.
The **FibRgFcLcb97** is very large. Most fields have been omitted here,
for brevity.

**fcClx:** 0x000001F8 specifies the offset, in bytes, of a location in
the [Table Stream](#Section_44f62054d9114989946ca42100c26a15). A **Clx**
begins at this offset.

**lcbClx:** 0x0000002D specifies the size, in bytes, of the **Clx** at
offset 0x000001F8 in the Table Stream.

The following shows the top level of the **Clx** at offset 0x000001F8 in
the Table Stream.

| **Offset** | **Size** | **Structure**                  | **Value**  |
|------------|----------|--------------------------------|------------|
| 000001F8   | 002D     | Clx **- Clx**                  |            |
| 000001F8   | 0000     | RgPrc **- RgPrc**              |            |
| 000001F8   | 002D     | [Pcdt](#pcdt) **- Pcdt**       |            |
| 000001F8   | 0001     | BYTE **- clxt**                | 0x02       |
| 000001F9   | 0004     | ULONG **- lcb**                | 0x00000028 |
| 000001FD   | 0028     | [PlcPcd](#plcpcd) **- PlcPcd** |            |

Figure 4: A Clx structure

**RgPrc:** This optional member is not present in this **Clx**
structure. Because the first byte of this **Clx** structure is 0x02, the
**Clx** begins with a **Pcdt** structure and does not contain an array
of [**Prc**](#prc) structures.

**Pcdt.clxt:** 0x02 specifies that this is a **Pcdt** structure, as
opposed to a **Prc** structure.

**Pcdt.lcb:** 0x00000028 specifies the size, in bytes, of **PlcPcd**. A
**PlcPcd** is a [**Plc**](#Section_a649fcc578684245be1204eea89d916b)
structure whose data members are [**Pcd**](#pcd) structures. A **Pcd**
is 8 bytes in size, so this **PlcPcd** consists of three **Pcd**
structures and four CP elements.

The following shows the top-level expansion of the **PlcPcd** that is
contained in this **Clx**. The **Pcd** structures, which are expanded in
later tables, specify the locations of text in the file.

| **Offset** | **Size** | **Structure**       | **Value**  |
|------------|----------|---------------------|------------|
| 000001FD   | 0028     | PlcPcd **- PlcPcd** |            |
| 000001FD   | 0004     | LONG **- cp\[0\]**  | 0x00000000 |
| 00000201   | 0004     | LONG **- cp\[1\]**  | 0x00000006 |
| 00000205   | 0004     | LONG **- cp\[2\]**  | 0x0000000D |
| 00000209   | 0004     | LONG **- cp\[3\]**  | 0x0000000E |
| 0000020D   | 0008     | Pcd **- pcd\[0\]**  |            |
| 00000215   | 0008     | Pcd **- pcd\[1\]**  |            |
| 0000021D   | 0008     | Pcd **- pcd\[2\]**  |            |

Figure 5: The top-level expansion of a PlcPcd

**cp\[0\]:** 0x00000000 specifies that **pcd\[0\]** applies to text
starting at CP zero. Because **cp\[1\]** is 0x0000006, **pcd\[0\]**
applies to CP values zero through 5, inclusive.

**cp\[1\]:** 0x00000006 specifies that **pcd\[1\]** applies to text
starting at CP 0x00000006. Because **cp\[2\]** is 0x0000000D,
**pcd\[1\]** applies to CP values 0x00000006 through 0x0000000C,
inclusive.

**cp\[2\]:** 0x0000000D specifies that **pcd\[2\]** applies to text
starting at CP 0x0000000D. Because **cp\[3\]** is 0x0000000E,
**pcd\[2\]** applies only to CP value 0x0000000D.

**cp\[3\]:** 0x0000000E specifies that the last CP value to which
**pcd\[2\]** applies is 0x0000000D.

**pcd\[0\]:** Specifies the location of text for CP values zero through
5, inclusive. This structure is expanded in the following table.

**pcd\[1\]:** Specifies the location of text for CP values 0x00000006
through 0x0000000C, inclusive. This structure is expanded following.

**pcd\[2\]:** Specifies the location of text for CP value 0x0000000D.
This structure is expanded following.

The following table shows the expansion of **pcd\[0\]**. This structure
specifies the location of the text at CP zero through 5, inclusive.

| **Offset** | **Size** | **Structure**                          | **Value**  |
|------------|----------|----------------------------------------|------------|
| 0000020D   | 0008     | Pcd **- pcd**                          |            |
| 0000020D   | 1 bit    | USHORT **- fNoParaLast**               | 0x1        |
| 0000020D   | 1 bit    | USHORT **- fR1 (ignored)**             | 0x0        |
| 0000020D   | 1 bit    | USHORT **- fDirty (ignored)**          | 0x0        |
| 0000020D   | 13 bits  | USHORT **- fR2 (ignored)**             | 0x0006     |
| 0000020F   | 0004     | [FcCompressed](#fccompressed) **- fc** |            |
| 0000020F   | 30 bits  | ULONG **- fc**                         | 0x00000C22 |
| 0000020F   | 1 bit    | ULONG **- fCompressed**                | 0x0        |
| 0000020F   | 1 bit    | ULONG **- r1 (ignored)**               | 0x0        |
| 00000213   | 0002     | [Prm0](#prm0) **- prm0**               |            |
| 00000213   | 1 bit    | USHORT **- fComplex**                  | 0x0        |
| 00000213   | 7 bits   | USHORT **- isprm**                     | 0x00       |
| 00000213   | 8 bits   | USHORT **- val**                       | 0x00       |

Figure 6: The expansion of pcd\[0\]

**fNoParaLast:** 0x1 specifies that the text that is referenced by this
**Pcd** structure does not contain any paragraph marks.

**fc.fc:** 0x00000C22 specifies the offset, in bytes, in the
WordDocument Stream where the text at CP zero begins. Because
**cp\[1\]** is 0x00000006, there are 6 characters of text at this
offset.

**fc.fCompressed:** 0x0 specifies that the text at offset **fc.fc** in
the WordDocument Stream consists of 16-bit Unicode characters.

**prm0.fComplex:** 0x0 specifies that this is a **Prm0** structure, as
opposed to a [**Prm1**](#prm1) structure.

**prm0.isprm:** 0x00 specifies that
[**sprmCLbcCRJ**](#character-properties) is applied to the range of CPs
that are referenced by this **Pcd** structure. However, an **isprm** of
0x0000, combined with a **val** of 0x0000, is a special case that
specifies that the CPs that are referenced by this **Pcd** have no
additional formatting from their **Pcd** structure

**prm0.val:** 0x00, combined with **isprm** 0x0000, specifies that the
CPs that are referenced by this **Pcd** have no additional formatting
from their **Pcd**.

The following shows the expansion of **pcd\[1\]**. This structure
specifies the location of the text at CP 0x0000006 through 0x0000000C,
inclusive.

| **Offset** | **Size** | **Structure**                 | **Value**  |
|------------|----------|-------------------------------|------------|
| 00000215   | 0008     | Pcd **- pcd**                 |            |
| 00000215   | 1 bit    | USHORT **- fNoParaLast**      | 0x0        |
| 00000215   | 1 bit    | USHORT **- fR1 (ignored)**    | 0x0        |
| 00000215   | 1 bit    | USHORT **- fDirty (ignored)** | 0x0        |
| 00000215   | 13 bits  | USHORT **- fR2 (ignored)**    | 0x0006     |
| 00000217   | 0004     | FcCompressed **- fc**         |            |
| 00000217   | 30 bits  | ULONG **- fc**                | 0x00000800 |
| 00000217   | 1 bit    | ULONG **- fCompressed**       | 0x1        |
| 00000217   | 1 bit    | ULONG **- r1 (ignored)**      | 0x0        |
| 0000021B   | 0002     | Prm0 **- prm0**               |            |
| 0000021B   | 1 bit    | USHORT **- fComplex**         | 0x0        |
| 0000021B   | 7 bits   | USHORT **- isprm**            | 0x00       |
| 0000021B   | 8 bits   | USHORT **- val**              | 0x00       |

Figure 7: Expansion of pcd\[1\]

**fNoParaLast:** 0x0 specifies that the text that is referenced by this
**Pcd** might contain a paragraph mark. A value of 0x0001 specifies that
there is no paragraph mark. A value of 0x0000 specifies that the
referenced text might or might not contain a paragraph mark.

**fc.fc:** 0x00000800 specifies the offset, in bytes, in the
WordDocument Stream where the text at CP 0x00000006 begins. Because
**fCompressed** is 1, the actual offset is **fc**/2, or 0x00000400.
Because **cp\[2\]** is 0x0000000D, there are 7 characters at this
offset.

**fc.fCompressed:** 0x1 specifies that the text at offset **fc**/2
consists of 8-bit ANSI characters, except for the values that are listed
in the table in the specification of FcCompressed (section 2.9.73).

**prm0.fComplex:** 0x0 specifies that this is a **Prm0** structure, as
opposed to a **Prm1** structure.

**prm0.isprm:** 0x00 specifies that sprmCLbcCRJ is applied to the range
of CPs that are referenced by this **Pcd**. However, an **isprm** of
0x0000, combined with a **val** of 0x0000, is a special case that
specifies that the CPs referenced by this **Pcd** have no additional
formatting from their **Pcd**.

**prm0.val:** 0x00, combined with **isprm** 0x0000, specifies that the
CPs that are referenced by this **Pcd** structure have no additional
formatting from their **Pcd**.

The following shows the expansion of **pcd\[2\]**. This structure
specifies the location of the text at CP 0x0000000D.

| **Offset** | **Size** | **Structure**                 | **Value**  |
|------------|----------|-------------------------------|------------|
| 0000021D   | 0008     | Pcd **- pcd**                 |            |
| 0000021D   | 1 bit    | USHORT **- fNoParaLast**      | 0x0        |
| 0000021D   | 1 bit    | USHORT **- fR1 (ignored)**    | 0x0        |
| 0000021D   | 1 bit    | USHORT **- fDirty (ignored)** | 0x0        |
| 0000021D   | 13 bits  | USHORT **- fR2 (ignored)**    | 0x0006     |
| 0000021F   | 0004     | FcCompressed **- fc**         |            |
| 0000021F   | 30 bits  | ULONG **- fc**                | 0x0000080E |
| 0000021F   | 1 bit    | ULONG **- fCompressed**       | 0x1        |
| 0000021F   | 1 bit    | ULONG **- r1 (ignored)**      | 0x0        |
| 00000223   | 0002     | Prm0 **- prm0**               |            |
| 00000223   | 1 bit    | USHORT **- fComplex**         | 0x0        |
| 00000223   | 7 bits   | USHORT **- isprm**            | 0x00       |
| 00000223   | 8 bits   | USHORT **- val**              | 0x00       |

Figure 8: Expansion of pcd\[2\]

**fNoParaLast:** 0x0 specifies that the text that is referenced by this
**Pcd** might contain a paragraph mark. A value of 0x0001 specifies that
there is no paragraph mark. A value of 0x0000 indicates that a paragraph
mark might, or might not, be contained in the referenced text.

**fc.fc:** 0x0000080E specifies the offset, in bytes, in the
WordDocument Stream where the text at CP 0x0000000D begins. Because
**fCompressed** is 1, the actual offset is **fc**/2, or 0x00000407.
Because **cp\[3\]** is 0x0000000E, there is 1 character at this offset.

**fc.fCompressed:** 0x1 specifies that the text at offset **fc**/2
consists of 8-bit ANSI characters, except for the values that are listed
in the table in the specification of **FcCompressed** (section 2.9.73).

**prm0.fComplex:** 0x0 specifies that this is a **Prm0** structure, as
opposed to a **Prm1** structure.

**prm0.isprm:** 0x00 specifies that sprmCLbcCRJ is applied to the range
of CPs that are referenced by this **Pcd**. However, an **isprm** of
0x0000, combined with a **val** of 0x0000, is a special case that
specifies that the CPs that are referenced by this **Pcd** have no
additional formatting from their **Pcd**.

**prm0.val:** 0x00, combined with **isprm** 0x0000, specifies that the
CPs that are referenced by this **Pcd** have no additional formatting
from their **Pcd**.

The following shows the Unicode text at offset 0x00000C22 in the
WordDocument Stream. This is an array of two-byte characters. This array
is not null-terminated.

| **Offset** | **Size** | **Structure**           | **Value** |
|------------|----------|-------------------------|-----------|
| 00000C22   | 000C     | USHORT array **- text** |           |
| 00000C22   | 0002     | USHORT **- text\[0\]**  | 0x0048    |
| 00000C24   | 0002     | USHORT **- text\[1\]**  | 0x0065    |
| 00000C26   | 0002     | USHORT **- text\[2\]**  | 0x006C    |
| 00000C28   | 0002     | USHORT **- text\[3\]**  | 0x006C    |
| 00000C2A   | 0002     | USHORT **- text\[4\]**  | 0x006F    |
| 00000C2C   | 0002     | USHORT **- text\[5\]**  | 0x0020    |

Figure 9: The text at offset 0x00000C22 in the Table Stream

**text\[0\]:** 0x0048 Unicode 'H'.

**text\[1\]:** 0x0065 Unicode 'e'.

**text\[2\]:** 0x006C Unicode 'l'.

**text\[3\]:** 0x006C Unicode 'l'.

**text\[4\]:** 0x006F Unicode 'o'.

**text\[5\]:** 0x0020 Unicode space.

The following shows the ANSI text at offset 0x00000400 in the
WordDocument Stream. This is an array of single byte characters. This
array is not null-terminated.

| **Offset** | **Size** | **Structure**         | **Value** |
|------------|----------|-----------------------|-----------|
| 00000400   | 0007     | BYTE array **- text** |           |
| 00000400   | 0001     | BYTE **- text\[0\]**  | 0x57      |
| 00000401   | 0001     | BYTE **- text\[1\]**  | 0x6F      |
| 00000402   | 0001     | BYTE **- text\[2\]**  | 0x72      |
| 00000403   | 0001     | BYTE **- text\[3\]**  | 0x6C      |
| 00000404   | 0001     | BYTE **- text\[4\]**  | 0x64      |
| 00000405   | 0001     | BYTE **- text\[5\]**  | 0x2E      |
| 00000406   | 0001     | BYTE **- text\[6\]**  | 0x0D      |

Figure 10: The text at offset 0x00000400 in the WordDocument Stream

**text\[0\]:** 0x57 ANSI 'W'.

**text\[1\]:** 0x6F ANSI 'o'.

**text\[2\]:** 0x72 ANSI 'r'.

**text\[3\]:** 0x6C ANSI 'l'.

**text\[4\]:** 0x64 ANSI 'd'.

**text\[5\]:** 0x2E ANSI period ('.').

**text\[6\]:** 0x0D ANSI paragraph mark.

The following structure shows the ANSI text at offset 0x00000407 in the
WordDocument Stream. This is an array of single byte characters. This
array is not null-terminated.

| **Offset** | **Size** | **Structure**         | **Value** |
|------------|----------|-----------------------|-----------|
| 00000407   | 0001     | BYTE array **- text** |           |
| 00000407   | 0001     | BYTE **- text\[0\]**  | 0x0D      |

Figure 11: The text at offset 0x00000407 in the WordDocument Stream

**text\[0\]:** 0x0D ANSI paragraph mark.

The complete text of this document is therefore, "Hello World", followed
by a period and two paragraph marks.
