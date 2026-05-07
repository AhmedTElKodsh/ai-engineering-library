# Day 10: OOP — Classes & Inheritance

> functions organize code — classes organize data AND the code that operates on it

**Concepts:** classes, `__init__`, instance/class attributes, methods, inheritance, `super()`, MRO | **Difficulty:** ★★★☆☆ | **Time:** ~40 min
**Builds On:** Day 06 — functions and scope, Day 08 — error handling
**Prepares For:** Day 11 — magic methods, Day 14 — weekly project

## Your Task

Build a class hierarchy for a shape system and a bank account system. You'll implement base classes, use inheritance to specialize behavior, use `super()` for cooperative initialization, and work with class methods and static methods.

## Run Tests

    pytest test_solution.py -v

Expected on first run: 1 passed, many failed — start implementing to turn them green!

---

## Deep Dive: Classes & Inheritance

### What Is a Class?

Think of a class as a **blueprint** and an instance as a **house built from that blueprint**. The blueprint defines the structure (attributes) and behavior (methods), while each house has its own specific values (this house is blue, that house is red).

```python
class Dog:
    species = "Canis familiaris"    # class attribute — shared by ALL dogs

    def __init__(self, name, age):
        self.name = name            # instance attribute — unique to each dog
        self.age = age

    def bark(self):
        return f"{self.name} says Woof!"

# Creating instances
rex = Dog("Rex", 5)
buddy = Dog("Buddy", 3)

rex.bark()        # "Rex says Woof!"
buddy.bark()      # "Buddy says Woof!"
rex.species       # "Canis familiaris" — shared
buddy.species     # "Canis familiaris" — same reference
```

### The `self` Parameter

Every instance method receives `self` as its first argument — it's a reference to the specific instance calling the method. Python passes it automatically.

```python
class Counter:
    def __init__(self):
        self.count = 0

    def increment(self):
        self.count += 1       # self refers to THIS specific counter
        return self.count

c1 = Counter()
c2 = Counter()
c1.increment()    # 1 — c1.count is 1
c1.increment()    # 2 — c1.count is 2
c2.increment()    # 1 — c2.count is 1 (independent!)
```

### Instance vs Class vs Static Methods

```python
class Pizza:
    base_price = 10.0              # class attribute

    def __init__(self, toppings):
        self.toppings = toppings   # instance attribute

    def price(self):
        """Instance method — accesses instance data via self."""
        return self.base_price + len(self.toppings) * 1.5

    @classmethod
    def margherita(cls):
        """Class method — factory that creates instances.
        Receives the CLASS (not instance) as first argument."""
        return cls(["mozzarella", "tomato"])

    @staticmethod
    def validate_topping(topping):
        """Static method — utility function, no self/cls needed."""
        return isinstance(topping, str) and len(topping) > 0

# Usage
p = Pizza(["mushrooms", "olives"])
p.price()                      # 13.0

m = Pizza.margherita()         # factory method
m.toppings                     # ["mozzarella", "tomato"]

Pizza.validate_topping("ham")  # True — no instance needed
```

### Inheritance: Building on What Exists

Inheritance lets you create specialized versions of existing classes. The child class inherits all attributes and methods from the parent, then adds or overrides what's different.

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        raise NotImplementedError("Subclasses must implement speak()")

    def describe(self):
        return f"{self.name} is a {type(self).__name__}"

class Cat(Animal):
    def speak(self):
        return f"{self.name} says Meow!"

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)     # call parent's __init__
        self.breed = breed

    def speak(self):
        return f"{self.name} says Woof!"

cat = Cat("Whiskers")
dog = Dog("Rex", "Labrador")

cat.speak()        # "Whiskers says Meow!"
dog.speak()        # "Rex says Woof!"
cat.describe()     # "Whiskers is a Cat" — inherited method works!
dog.describe()     # "Rex is a Dog"
```

### `super()`: Cooperative Inheritance

`super()` calls the parent class's method. It's essential for proper initialization in inheritance chains.

```python
class Vehicle:
    def __init__(self, make, model):
        self.make = make
        self.model = model

class Car(Vehicle):
    def __init__(self, make, model, doors=4):
        super().__init__(make, model)    # initialize Vehicle parts
        self.doors = doors               # add Car-specific attribute

class ElectricCar(Car):
    def __init__(self, make, model, battery_kwh, doors=4):
        super().__init__(make, model, doors)   # initialize Car parts
        self.battery_kwh = battery_kwh         # add ElectricCar-specific

tesla = ElectricCar("Tesla", "Model 3", 75)
tesla.make           # "Tesla" — from Vehicle
tesla.doors          # 4 — from Car
tesla.battery_kwh    # 75 — from ElectricCar
```

### Method Resolution Order (MRO)

When a class has multiple parents, Python uses the C3 linearization algorithm to determine which method to call. You can inspect it with `ClassName.__mro__`.

```python
class A:
    def greet(self): return "A"

class B(A):
    def greet(self): return "B"

class C(A):
    def greet(self): return "C"

class D(B, C):
    pass

D.__mro__    # (D, B, C, A, object)
D().greet()  # "B" — B comes before C in MRO
```

### isinstance and issubclass

```python
isinstance(rex, Dog)      # True
isinstance(rex, Animal)   # True — Dog inherits from Animal
isinstance(rex, Cat)      # False

issubclass(Dog, Animal)   # True
issubclass(Cat, Dog)      # False
```

### Try This!

1. Create a `Shape` base class with an `area()` method, then create `Circle` and `Rectangle` subclasses.
2. What does `super()` return? Is it a parent class instance?
3. Can a class inherit from two parents? What happens if both define the same method?

---

## Cheatsheet

| Concept | Syntax | Purpose |
|---------|--------|---------|
| Class | `class MyClass:` | Define a blueprint |
| Constructor | `def __init__(self):` | Initialize instance |
| Instance attr | `self.x = value` | Per-instance data |
| Class attr | `x = value` (in class body) | Shared data |
| Inheritance | `class Child(Parent):` | Extend a class |
| super() | `super().__init__()` | Call parent method |
| @classmethod | `@classmethod def f(cls):` | Factory methods |
| @staticmethod | `@staticmethod def f():` | Utility functions |
| isinstance | `isinstance(obj, Class)` | Type checking |
