import secrets
import string


def generate_password(length=12, use_uppercase=True, use_numbers=True, use_special_chars=True):

    lowercase_chars = string.ascii_lowercase
    uppercase_chars = string.ascii_uppercase if use_uppercase else ""
    number_chars = string.digits if use_numbers else ""
    special_chars = "!@#$%^&*()-_=+[]{}|;:,.<>?/~`" if use_special_chars else ""

    all_chars = lowercase_chars + uppercase_chars + number_chars + special_chars

    if not all_chars:
        raise ValueError("At least one character type must be selected.")

    
    required_groups = [g for g in (lowercase_chars, uppercase_chars, number_chars, special_chars) if g]

    if length < len(required_groups):
        raise ValueError(
            f"Password length must be at least {len(required_groups)} "
            f"to include one of each selected character type."
        )

    password_chars = [secrets.choice(group) for group in required_groups]
    password_chars += [secrets.choice(all_chars) for _ in range(length - len(required_groups))]

    secrets.SystemRandom().shuffle(password_chars)
    return "".join(password_chars)


def prompt_yes_no(prompt, default=True):
    suffix = " [Y/n]: " if default else " [y/N]: "
    answer = input(prompt + suffix).strip().lower()
    if answer == "":
        return default
    return answer in ("y", "yes")


def main():
    try:
        length_input = input("Enter password length : ").strip()
        length = int(length_input) if length_input else 12

        use_uppercase = prompt_yes_no("Include uppercase letters?")
        use_numbers = prompt_yes_no("Include numbers?")
        use_special_chars = prompt_yes_no("Include special characters?")

        password = generate_password(
            length=length,
            use_uppercase=use_uppercase,
            use_numbers=use_numbers,
            use_special_chars=use_special_chars,
        )
        print("\nYour Secure Password:", password)
    except ValueError as e:
        print("Error:", e)
    except KeyboardInterrupt:
        print("\nCancelled.")


if __name__ == "__main__":
    main()