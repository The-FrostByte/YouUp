function ProfilePictureLoader() {
  return (
    <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-full">
      <span className="loading loading-spinner loading-md text-white"></span>
    </div>
  );
}

export default ProfilePictureLoader;