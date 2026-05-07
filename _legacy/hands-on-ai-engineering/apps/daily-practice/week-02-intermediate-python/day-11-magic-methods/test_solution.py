"""Tests for Day 11: Magic Methods & Properties."""
import pytest

try:
    from solution_template import Money, Playlist, Temperature
except ImportError as e:
    pytest.skip(
        f"Could not import from solution_template: {e}. Did you rename a class?",
        allow_module_level=True,
    )


# ── Setup Verification ─────────────────────

def test_solution_template_loaded():
    """Verify the solution file is properly set up."""
    assert callable(Money), "Money should be a class"
    assert callable(Playlist), "Playlist should be a class"
    assert callable(Temperature), "Temperature should be a class"


# ── Tests for Money ────────────────────────

def test_money_repr():
    m = Money(10.5, "USD")
    assert repr(m) == "Money(10.50, 'USD')", (
        f"repr should be Money(10.50, 'USD'), got {repr(m)}"
    )


def test_money_str():
    m = Money(10.5, "USD")
    assert str(m) == "USD 10.50", (
        f"str should be 'USD 10.50', got {str(m)}"
    )


def test_money_eq():
    assert Money(10, "USD") == Money(10, "USD")
    assert Money(10, "USD") != Money(10, "EUR")
    assert Money(10, "USD") != Money(20, "USD")


def test_money_lt():
    assert Money(5, "USD") < Money(10, "USD")
    assert not Money(10, "USD") < Money(5, "USD")


def test_money_lt_different_currency():
    with pytest.raises(ValueError):
        Money(5, "USD") < Money(10, "EUR")


def test_money_add():
    result = Money(10, "USD") + Money(5, "USD")
    assert result == Money(15, "USD"), (
        f"Expected Money(15, 'USD'), got {result}"
    )


def test_money_add_different_currency():
    with pytest.raises(ValueError):
        Money(10, "USD") + Money(5, "EUR")


def test_money_sub():
    result = Money(10, "USD") - Money(3, "USD")
    assert result == Money(7, "USD")


def test_money_mul():
    result = Money(10, "USD") * 3
    assert result == Money(30, "USD")


def test_money_rmul():
    result = 3 * Money(10, "USD")
    assert result == Money(30, "USD"), (
        "3 * Money should work via __rmul__"
    )


def test_money_bool():
    assert bool(Money(10, "USD")) is True
    assert bool(Money(0, "USD")) is False


def test_money_sorting():
    amounts = [Money(30, "USD"), Money(10, "USD"), Money(20, "USD")]
    sorted_amounts = sorted(amounts)
    assert sorted_amounts == [Money(10, "USD"), Money(20, "USD"), Money(30, "USD")]


# ── Tests for Playlist ────────────────────

def test_playlist_add_and_len():
    p = Playlist("My Playlist")
    assert len(p) == 0
    p.add_song("Song A")
    p.add_song("Song B")
    assert len(p) == 2


def test_playlist_getitem():
    p = Playlist("Test")
    p.add_song("First")
    p.add_song("Second")
    p.add_song("Third")
    assert p[0] == "First"
    assert p[-1] == "Third"


def test_playlist_slicing():
    p = Playlist("Test")
    for s in ["A", "B", "C", "D"]:
        p.add_song(s)
    assert p[1:3] == ["B", "C"], (
        f"Slicing p[1:3] should give ['B', 'C'], got {p[1:3]}"
    )


def test_playlist_contains():
    p = Playlist("Test")
    p.add_song("Song A")
    assert "Song A" in p
    assert "Song Z" not in p


def test_playlist_iter():
    p = Playlist("Test")
    p.add_song("X")
    p.add_song("Y")
    songs = list(p)
    assert songs == ["X", "Y"], (
        f"Iterating should give ['X', 'Y'], got {songs}"
    )


def test_playlist_remove():
    p = Playlist("Test")
    p.add_song("A")
    p.add_song("B")
    p.remove_song("A")
    assert len(p) == 1
    assert "A" not in p


def test_playlist_remove_missing():
    p = Playlist("Test")
    with pytest.raises(ValueError):
        p.remove_song("NonExistent")


def test_playlist_add_playlists():
    p1 = Playlist("Rock")
    p1.add_song("Song A")
    p2 = Playlist("Pop")
    p2.add_song("Song B")

    combined = p1 + p2
    assert len(combined) == 2
    assert "Song A" in combined
    assert "Song B" in combined
    assert "Rock" in combined.name and "Pop" in combined.name


def test_playlist_repr():
    p = Playlist("Chill")
    p.add_song("A")
    p.add_song("B")
    assert "Chill" in repr(p)
    assert "2" in repr(p)


# ── Tests for Temperature ─────────────────

def test_temperature_celsius():
    t = Temperature(100)
    assert t.celsius == 100


def test_temperature_fahrenheit_read():
    t = Temperature(100)
    assert t.fahrenheit == pytest.approx(212.0), (
        f"100°C should be 212°F, got {t.fahrenheit}"
    )


def test_temperature_fahrenheit_write():
    t = Temperature()
    t.fahrenheit = 32
    assert t.celsius == pytest.approx(0.0), (
        f"32°F should be 0°C, got {t.celsius}"
    )


def test_temperature_kelvin_read():
    t = Temperature(0)
    assert t.kelvin == pytest.approx(273.15), (
        f"0°C should be 273.15K, got {t.kelvin}"
    )


def test_temperature_kelvin_write():
    t = Temperature()
    t.kelvin = 373.15
    assert t.celsius == pytest.approx(100.0), (
        f"373.15K should be 100°C, got {t.celsius}"
    )


def test_temperature_below_absolute_zero():
    with pytest.raises(ValueError):
        Temperature(-300)


def test_temperature_below_absolute_zero_fahrenheit():
    t = Temperature(0)
    with pytest.raises(ValueError):
        t.fahrenheit = -500


def test_temperature_repr():
    t = Temperature(25)
    assert "25.00" in repr(t)


def test_temperature_str():
    t = Temperature(100)
    s = str(t)
    assert "100.0" in s
    assert "212.0" in s
    assert "373." in s


def test_temperature_eq():
    assert Temperature(100) == Temperature(100)
    t = Temperature()
    t.fahrenheit = 212
    assert t == Temperature(100)


def test_temperature_lt():
    assert Temperature(0) < Temperature(100)
    assert not Temperature(100) < Temperature(0)
