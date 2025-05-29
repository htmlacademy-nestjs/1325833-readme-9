import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsTags', async: false })
export class IsTagsConstraint implements ValidatorConstraintInterface {
  validate(value: any, validationArguments?: ValidationArguments) {
    if (!value) {
      return true;
    }

    if (!Array.isArray(value) || value.length > 8) {
      return false;
    }

    const tagPattern = /^[a-zA-Z][a-zA-Z0-9]{2,9}$/;

    return value.every(
      (tag) =>
        typeof tag === 'string' && tagPattern.test(tag) && !/\s/.test(tag)
    );
  }

  defaultMessage() {
    return `
      Теги должны соответствовать правилам:
      - Максимум 8 тегов
      - Каждый тег: 3-10 символов
      - Без пробелов
      - Начинаться с буквы
      - Только буквы и цифры
    `;
  }
}

export const IsTags = (validationOptions?: ValidationOptions) => {
  return function (object: object, propertyKey: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyKey,
      options: validationOptions,
      constraints: [],
      validator: IsTagsConstraint,
    });
  };
};
