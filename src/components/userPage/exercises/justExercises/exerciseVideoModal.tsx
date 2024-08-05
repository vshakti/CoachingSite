import { XIcon } from "lucide-react";

interface ExerciseVideoProps {
  exerciseVideo: URL | undefined;
}

const ExerciseVideoModal = (exerciseVideo: ExerciseVideoProps) => {
  function extractYouTubeId(url: string): string | null {
    const youtubeRegex =
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/|v\/|.+\?v=)?([^"&?\/\s]{11})/;
    const match = url.match(youtubeRegex);

    return match ? match[1] : null;
  }

  function getYouTubeEmbedUrl(url: string): string | undefined {
    const videoId = extractYouTubeId(url);

    return videoId ? `https://www.youtube.com/embed/${videoId}` : undefined;
  }

  const url = exerciseVideo.exerciseVideo?.toString();
  let embedUrl: string | undefined;

  if (url) {
    embedUrl = getYouTubeEmbedUrl(url);
  }

  return (
    <dialog id="exercise_video_modal" className="modal">
      <div className="remove-scrollbar fixed inset-0 flex items-center justify-center overflow-auto bg-black/25 backdrop-blur-sm">
        <div className="mr-2.5 flex max-h-[420px] max-w-[640px] flex-col gap-y-4 rounded-md border bg-gradient-to-b from-slate-950 via-gray-950 to-slate-950 p-4 md:mr-0">
          <div className="flex flex-row items-center justify-between">
            <div className="text-xl font-medium text-white md:text-3xl">
              EXERCISE DEMONSTRATION
            </div>
            <form method="dialog">
              <button className="flex items-center justify-end">
                <XIcon className="size-8 text-white md:size-10" />
              </button>
            </form>
          </div>

          <iframe
            src={embedUrl}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            className="h-[170px] w-[320px] rounded-md md:h-[315px] md:w-[560px]"
          />
        </div>
      </div>
    </dialog>
  );
};

export default ExerciseVideoModal;
