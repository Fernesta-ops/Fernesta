from pathlib import Path

from PIL import Image, ImageChops, ImageOps


ROOT = Path(__file__).resolve().parents[1]
ASSET_ROOT = ROOT / "public" / "prototype" / "assets"
SOURCE_ASSET_ROOT = ROOT / "scripts" / "source-assets"

EDITORIAL_ASSETS = (
    "hero-connected-editorial",
    "strategy-direction-editorial",
    "brand-creative-editorial",
    "growth-performance-editorial",
    "social-content-production",
)


def save_editorial_webp(stem: str) -> None:
    source = ASSET_ROOT / f"{stem}.png"
    destination = ASSET_ROOT / f"{stem}.webp"
    with Image.open(source) as image:
        image.convert("RGB").save(
            destination,
            "WEBP",
            quality=84,
            method=6,
        )


def save_logo_webp() -> None:
    source = ASSET_ROOT / "fernesta-lockup-red-transparent.png"
    destination = ASSET_ROOT / "fernesta-lockup-red-transparent.webp"
    with Image.open(source) as image:
        image.thumbnail((1024, 1024), Image.Resampling.LANCZOS)
        image.save(
            destination,
            "WEBP",
            lossless=True,
            method=6,
        )


def save_social_preview() -> None:
    source = ROOT / "public" / "og.png"
    destination = ROOT / "public" / "og.jpg"
    with Image.open(source) as image:
        image.convert("RGB").save(
            destination,
            "JPEG",
            quality=88,
            optimize=True,
            progressive=True,
        )


def save_mamaearth_wordmark() -> None:
    source = SOURCE_ASSET_ROOT / "mamaearth-official-wordmark.png"
    destination = ASSET_ROOT / "credentials" / "mamaearth.png"

    with Image.open(source) as image:
        rgb = image.convert("RGB")
        distance_from_white = ImageChops.difference(
            rgb,
            Image.new("RGB", rgb.size, "white"),
        )
        alpha = ImageOps.grayscale(distance_from_white).point(
            lambda value: min(255, value * 5),
        )
        bounds = alpha.getbbox()
        if not bounds:
            raise ValueError("Mamaearth source did not contain a visible wordmark.")

        left, top, right, bottom = bounds
        padding = 12
        crop_box = (
            max(0, left - padding),
            max(0, top - padding),
            min(rgb.width, right + padding),
            min(rgb.height, bottom + padding),
        )
        alpha = alpha.crop(crop_box)
        wordmark = Image.new("RGBA", alpha.size, (77, 61, 44, 0))
        wordmark.putalpha(alpha)
        wordmark.save(destination, "PNG", optimize=True)


def save_browser_icons() -> None:
    source = ASSET_ROOT / "fernesta-monogram.png"
    cream = (245, 233, 219, 255)
    signal_red = (129, 25, 26, 255)

    with Image.open(source) as image:
        alpha = image.convert("RGBA").getchannel("A")
        bounds = alpha.getbbox()
        if not bounds:
            raise ValueError("Fernesta monogram source did not contain visible artwork.")

        alpha = alpha.crop(bounds)
        monogram = Image.new("RGBA", alpha.size, signal_red)
        monogram.putalpha(alpha)

        def render_icon(size: int) -> Image.Image:
            canvas = Image.new("RGBA", (size, size), cream)
            maximum = max(1, round(size * 0.84))
            fitted = ImageOps.contain(
                monogram,
                (maximum, maximum),
                Image.Resampling.LANCZOS,
            )
            position = (
                (size - fitted.width) // 2,
                (size - fitted.height) // 2,
            )
            canvas.alpha_composite(fitted, position)
            return canvas

        favicon = render_icon(64)
        favicon.save(ROOT / "public" / "favicon.png", "PNG", optimize=True)
        favicon.save(
            ROOT / "public" / "fernesta-fe-favicon.png",
            "PNG",
            optimize=True,
        )
        render_icon(180).save(
            ROOT / "public" / "apple-touch-icon.png",
            "PNG",
            optimize=True,
        )
        render_icon(192).save(ROOT / "public" / "icon-192.png", "PNG", optimize=True)
        render_icon(512).save(ROOT / "public" / "icon-512.png", "PNG", optimize=True)
        favicon.save(
            ROOT / "public" / "favicon.ico",
            "ICO",
            sizes=[(16, 16), (32, 32), (48, 48), (64, 64)],
        )
        favicon.save(
            ROOT / "public" / "fernesta-fe-favicon.ico",
            "ICO",
            sizes=[(16, 16), (32, 32), (48, 48), (64, 64)],
        )


for asset in EDITORIAL_ASSETS:
    save_editorial_webp(asset)

save_logo_webp()
save_social_preview()
save_mamaearth_wordmark()
save_browser_icons()

for path in [
    *(ASSET_ROOT / f"{asset}.webp" for asset in EDITORIAL_ASSETS),
    ASSET_ROOT / "fernesta-lockup-red-transparent.webp",
    ASSET_ROOT / "credentials" / "mamaearth.png",
    ROOT / "public" / "favicon.ico",
    ROOT / "public" / "favicon.png",
    ROOT / "public" / "fernesta-fe-favicon.ico",
    ROOT / "public" / "fernesta-fe-favicon.png",
    ROOT / "public" / "apple-touch-icon.png",
    ROOT / "public" / "icon-192.png",
    ROOT / "public" / "icon-512.png",
    ROOT / "public" / "og.jpg",
]:
    print(f"{path.relative_to(ROOT)}: {path.stat().st_size / 1024:.1f} KB")
