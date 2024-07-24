import UserForm from "../forms/userForm";

const Profile = () => {
  return (
    <div className="grid h-full gap-x-6 gap-y-6 px-5 md:-mt-0 md:h-5/6 md:grid-cols-12 md:grid-rows-6 md:px-0 md:py-6">
      <div className="col-span-1" />
      <div className="col-span-10 row-span-4 h-full w-full rounded-3xl border border-neutral-400 bg-neutral-50 shadow-lg shadow-neutral-300 md:col-span-6 md:row-span-6 dark:border-neutral-700 dark:bg-neutral-900 dark:shadow-neutral-950">
        <div className="flex h-full w-full items-center justify-center overflow-auto px-8 py-4">
          <UserForm />
        </div>
      </div>
      <div className="col-span-10 row-span-2 h-full w-full rounded-3xl border border-neutral-400 bg-neutral-50 shadow-lg shadow-neutral-300 md:col-span-4 md:row-span-4 dark:border-neutral-700 dark:bg-neutral-900 dark:shadow-neutral-950">
        oii
      </div>
      <div className="col-span-10 row-span-2 h-full w-full rounded-3xl border border-neutral-400 bg-neutral-50 shadow-lg shadow-neutral-300 md:col-span-4 md:row-span-2 dark:border-neutral-700 dark:bg-neutral-900 dark:shadow-neutral-950">
        oii
      </div>
    </div>
  );
};

export default Profile;
