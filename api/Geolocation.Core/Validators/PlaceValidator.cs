﻿using FluentValidation;
using Geolocation.Core.Entities;

namespace Geolocation.Core.Validators
{
    public class PlaceValidator : AbstractValidator<Place>
    {
        public PlaceValidator()
        {
            RuleFor(place => place.Latitude)
                .Must(lat => lat >= -90 && lat <= 90)
                .WithMessage("Latitude must be in range [-90;90] (inclusive).");
            RuleFor(place => place.Longitude)
                .Must(lng => lng >= -180 && lng <= 180)
                .WithMessage("Longitude must be in range [-180;180] (inclusive).");
            RuleFor(place => place.Name)
                .NotNull()
                .WithMessage("Name of place can't be null.")
                .MaximumLength(32)
                .WithMessage("Name length can't be longer than 32 symbols.");
            RuleFor(place => place.Name)
                .NotEmpty()
                .When(place => place.Name != null)
                .WithMessage("Name of place can't be empty.");
            RuleFor(place => place.Description)
                .MaximumLength(256)
                .WithMessage("Description length can't be longer than 256 symbols.");
        }
    }
}
