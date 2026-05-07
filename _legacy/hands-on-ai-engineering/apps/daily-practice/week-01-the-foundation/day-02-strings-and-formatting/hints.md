# Day 02: Hints Guide

> Only open this file when you're stuck! Try solving the exercises first.

---

## 1. reverse_string

<details>
<summary>💡 Hint 1: What tool reverses sequences?</summary>

Think about slice notation: `text[start:stop:step]`

What happens when you use a negative step?

</details>

<details>
<summary>💡 Hint 2: The magic step value</summary>

A step of `-1` walks backwards through the string from end to start.

Try: `text[::-1]`

</details>

---

## 2. count_vowels

<details>
<summary>💡 Hint 1: How to handle case?</summary>

Convert the string to lowercase first with `.lower()` so you only need to check against lowercase vowels.

</details>

<details>
<summary>💡 Hint 2: Counting approach</summary>

Loop through each character and check if it's in `"aeiou"`.

Keep a counter variable, or use `sum()` with a generator expression:

```python
sum(1 for char in text.lower() if char in "aeiou")
```

</details>

---

## 3. title_case

<details>
<summary>💡 Hint 1: Break it into pieces</summary>

Split the string into words using `.split()` (splits on spaces by default).

Process each word individually, then join them back together.

</details>

<details>
<summary>💡 Hint 2: Capitalizing each word</summary>

For each word:

- Capitalize the first character: `word[0].upper()`
- Lowercase the rest: `word[1:].lower()`
- Combine them: `word[0].upper() + word[1:].lower()`

</details>

<details>
<summary>💡 Hint 3: Putting it back together</summary>

Use `" ".join(...)` to combine the processed words with spaces.

```python
words = text.split()
capitalized = [word[0].upper() + word[1:].lower() for word in words]
return " ".join(capitalized)
```

</details>

---

## 4. extract_digits

<details>
<summary>💡 Hint 1: How to identify digits?</summary>

Use the `.isdigit()` method to test if a character is a digit.

```python
"5".isdigit()  # True
"a".isdigit()  # False
```

</details>

<details>
<summary>💡 Hint 2: Building the result</summary>

Loop through each character and keep only the digits.

You can use a list comprehension or generator expression:

```python
"".join(c for c in text if c.isdigit())
```

</details>

---

## 5. format_greeting

<details>
<summary>💡 Hint 1: What are f-strings?</summary>

F-strings let you embed variables directly in strings:

```python
name = "Alice"
f"Hello, {name}!"  # "Hello, Alice!"
```

The `f` before the quote makes it an f-string.

</details>

<details>
<summary>💡 Hint 2: Watch the punctuation</summary>

The exact format is:

- Comma after "Hello"
- Exclamation mark after the name
- Period at the end

```python
return f"Hello, {name}! You are {age} years old and live in {city}."
```

</details>
